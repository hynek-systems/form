<?php

namespace Hynek\Form;

use Hynek\Form\Commands\MakeFormCommand;
use Hynek\HynekModuleTools\HynekModuleToolsServiceProvider;
use Hynek\HynekModuleTools\Package;
use Illuminate\Support\Facades\Blade;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ReflectionClass;

class FormServiceProvider extends HynekModuleToolsServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package->name('hynek-form')
            ->hasConfigFile()
            ->hasRoute('form')
            ->hasViews()
            ->hasAssets()
            ->hasCommands(
                MakeFormCommand::class
            );
    }

    public function packageBooted()
    {
        $this->app->singleton('form-registry', FormRegistry::class);
        $this->app->bind(
            Contracts\Form::class,
            fn () => app(config('form.form_class'))->view(config('form.views.form'))
        );
        $this->app->bind(
            FormContainer::class,
            fn () => app(config('form.default_form_container'))->view(config('form.views.form_container'))
        );
        $this->app->bind(
            Contracts\ControlContainer::class,
            fn () => app(config('form.default_control_container'))->view(config('form.views.control_container'))
        );
        $this->app->bind(Contracts\FormBuilder::class, config('form.default_form_builder'));
        $this->app->bind(
            Contracts\Label::class,
            fn () => app(config('form.default_label'))->view(config('form.views.label'))
        );
        $this->app->bind(
            Contracts\HelpText::class,
            fn () => app(config('form.default_help_text'))->view(config('form.views.help_text'))
        );
        $this->app->bind(
            Contracts\Error::class,
            fn () => app(config('form.default_error'))->view(config('form.views.error'))
        );
        $this->app->bind(Contracts\ElementsCollection::class, config('form.elements_collection'));

        foreach (config('form.controls') as $key => $control) {
            $this->app->bind(
                "form.control.{$key}",
                fn ($_, $params) => app($control, $params)->view(config('form.views.'.$key))
            );
        }

        cache()->rememberForever('scanned_forms', fn () => $this->registerForms());

        Blade::directive('form', function ($expression) {
            return "<?php echo optional(app('form-registry')->get($expression))->render(); ?>";
        });
    }

    protected function registerForms()
    {
        $forms = collect();
        $paths = config('form.auto_register_forms', []);

        foreach ($paths as $path) {
            if (! is_dir($path)) {
                continue;
            }

            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS)
            );

            foreach ($iterator as $file) {
                if (! $file->isFile() || $file->getExtension() !== 'php') {
                    continue;
                }

                $filepath = $file->getPathname();
                $class = $this->getClassFullNameFromFile($filepath);

                if (! $class) {
                    continue;
                }

                try {
                    // Ensure class can be autoloaded / exists
                    if (! class_exists($class)) {
                        // class_exists will attempt Composer autoload
                        continue;
                    }

                    $ref = new ReflectionClass($class);

                    // Only register concrete classes that extend your base Form
                    if ($ref->isInstantiable() && $ref->isSubclassOf(\Hynek\Form\Form::class)) {
                        $entry = app('form-registry')->autoRegister($class);
                        $forms = $forms->merge($entry);
                    }
                } catch (\Throwable $e) {
                    // ignore parse/autoload/reflection errors — don't crash the app
                    continue;
                }
            }
        }

        return $forms->toArray();
    }

    /**
     * Extract the full class name (namespace + class) from a PHP file using token_get_all().
     *
     * Returns null if no class found.
     */
    protected function getClassFullNameFromFile(string $file): ?string
    {
        $src = file_get_contents($file);
        if ($src === false) {
            return null;
        }

        $tokens = token_get_all($src);
        $namespace = '';
        $class = null;
        $count = count($tokens);
        $i = 0;

        while ($i < $count) {
            $token = $tokens[$i];

            // namespace declaration
            if (is_array($token) && $token[0] === T_NAMESPACE) {
                $i++;
                $nsParts = [];
                while ($i < $count) {
                    $t = $tokens[$i];
                    if (is_array($t) && in_array($t[0], [T_STRING, T_NAME_QUALIFIED, T_NAME_FULLY_QUALIFIED, T_NS_SEPARATOR])) {
                        $nsParts[] = $t[1];
                    } elseif (is_string($t) && ($t === ';' || $t === '{')) {
                        break;
                    }
                    $i++;
                }
                $namespace = trim(implode('', $nsParts));
            }

            // class / interface / trait declaration (skip anonymous classes)
            if (is_array($token) && in_array($token[0], [T_CLASS, T_INTERFACE, T_TRAIT], true)) {
                // detect anonymous class: previous non-whitespace token is T_NEW
                $prev = $i - 1;
                $isAnonymous = false;
                while ($prev >= 0) {
                    $pt = $tokens[$prev];
                    if (is_array($pt) && $pt[0] === T_WHITESPACE) {
                        $prev--;
                        continue;
                    }
                    if (is_array($pt) && $pt[0] === T_NEW) {
                        $isAnonymous = true;
                    }
                    break;
                }
                if ($isAnonymous) {
                    $i++;
                    continue;
                }

                // next significant token is the name
                $i++;
                while ($i < $count && is_array($tokens[$i]) && $tokens[$i][0] === T_WHITESPACE) {
                    $i++;
                }
                if ($i < $count && is_array($tokens[$i]) && $tokens[$i][0] === T_STRING) {
                    $class = $tokens[$i][1];
                    break;
                }
            }

            $i++;
        }

        if ($class === null) {
            return null;
        }

        return $namespace ? $namespace . '\\' . $class : $class;
    }
}

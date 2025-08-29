<?php

namespace Hynek\Form;

use Hynek\HynekModuleTools\HynekModuleToolsServiceProvider;
use Hynek\HynekModuleTools\Package;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;

class FormServiceProvider extends HynekModuleToolsServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package->name('hynek-form')
            ->hasConfigFile();
    }

    public function packageBooted()
    {
        $this->app->bind(Contracts\Form::class, config('form.form_class'));
        $this->app->bind(FormContainer::class, config('form.default_form_container'));
        $this->app->bind(
            Contracts\ElementContainer::class,
            fn () => app(config('form.default_element_container'))->view(config('form.views.element_container'))
        );
        $this->app->bind(Contracts\FormBuilder::class, config('form.default_form_builder'));
        $this->app->bind(Contracts\Label::class, config('form.default_label'));
        $this->app->bind(Contracts\HelpText::class, config('form.default_help_text'));
        $this->app->bind(Contracts\Error::class, config('form.default_error'));
        $this->app->bind(Contracts\ElementsCollection::class, config('form.elements_collection'));

        foreach (config('form.controls') as $key => $control) {
            $this->app->bind(
                "form.control.{$key}",
                fn () => app($control)->view(config('form.views.'.$key))
            );
        }

        Str::macro('dotToArraySyntax', function (string $key): string {
            $parts = explode('.', $key);
            $first = array_shift($parts);

            return $first.implode('', array_map(fn ($part) => "[$part]", $parts));
        });

        Str::macro('arraySyntaxToDot', function (string $key): string {
            // replace brackets with dots
            $key = preg_replace('/\[(.*?)\]/', '.$1', $key);

            // remove accidental leading dot
            return ltrim($key, '.');
        });

        Stringable::macro('arraySyntaxToString', function (string $key): string {
            return Str::arraySyntaxToDot($this->value);
        });

        Stringable::macro('arraySyntaxToDot', function () {
            return Str::arraySyntaxToDot($this->value);
        });
    }
}

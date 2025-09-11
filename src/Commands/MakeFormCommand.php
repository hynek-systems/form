<?php

namespace Hynek\Form\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeFormCommand extends Command
{
    protected $signature = 'make:form {className : Name of the form class}';

    protected $description = 'Create form class';

    public function handle(): void
    {
        try {
            $this->createForm();
            $this->info('Form class created successfully.');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    protected function basePath(): string
    {
        return app_path('Forms');
    }

    protected function createDirectoryIfNeeded(): string
    {
        $classPath = Str::beforeLast($this->argument('className'), '/');
        $filename = Str::afterLast($this->argument('className'), '/');
        $basePath = $this->basePath();

        if ($classPath !== $filename) {
            $path = $basePath.DIRECTORY_SEPARATOR.$classPath;
        } else {
            $path = $basePath;
        }

        if (! file_exists($path)) {
            File::makeDirectory($path, 0755, true);
        }

        return $path;
    }

    protected function getNamespace(): string
    {
        $classPath = Str::beforeLast($this->argument('className'), '/');
        $filename = Str::afterLast($this->argument('className'), '/');

        if ($classPath !== $filename) {
            return 'App\\Forms\\'.Str::replace('/', '\\', Str::beforeLast($this->argument('className'), '/'));
        }

        return 'App\\Forms';
    }

    protected function createForm()
    {
        $path = $this->createDirectoryIfNeeded();
        $namespace = $this->getNamespace();
        $className = pathinfo($this->argument('className'), PATHINFO_FILENAME);
        $stubContent = file_get_contents(__DIR__.'/../../resources/stubs/FormClass.stub');

        $content = Str::replace(
            ['{{NAMESPACE}}', '{{CLASS}}'],
            [$namespace, $className],
            $stubContent
        );

        file_put_contents($path.DIRECTORY_SEPARATOR.$className.'.php', $content);
    }
}

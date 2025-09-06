<?php

namespace Hynek\Form;

use Hynek\HynekModuleTools\HynekModuleToolsServiceProvider;
use Hynek\HynekModuleTools\Package;

class FormServiceProvider extends HynekModuleToolsServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package->name('hynek-form')
            ->hasConfigFile()
            ->hasViews()
            ->hasAssets();
    }

    public function packageBooted()
    {
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
    }
}

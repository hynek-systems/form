<?php

namespace Hynek\Form\Services;

use Hynek\Form\Contracts\FormControl;
use Hynek\Form\Exceptions\InvalidControlType;

class FormControlManager
{
    /**
     * @throws InvalidControlType
     */
    public function createControl(string $type, string $name): FormControl
    {
        if (! config('form.controls.'.$type)) {
            throw new InvalidControlType('No such control: '.$type);
        }

        return app(config('form.controls.'.$type), ['name' => $name]);
    }

    public function resolveControl(string $alias, string $name): FormControl
    {
        if (! config('form.controls.'.$alias)) {
            throw new InvalidControlType('No such control: '.$alias);
        }

        return app(config('form.controls.'.$alias), ['name' => $name]);
    }

    public function resolveView(string $alias): ?string
    {
        return config('form.views.'.$alias);
    }

    public function register(string $alias, string $controlClass, string $view)
    {
        config()?->set('form.controls.'.$alias, $controlClass);
        config()?->set('form.views.'.$alias, $view);
        app()->bind(
            'form.control'.$alias,
            fn ($_, $params) => app($controlClass, $params)->view($view)
        );
    }
}

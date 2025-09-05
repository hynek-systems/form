<?php

namespace Hynek\Form\Services;

use Hynek\Form\Contracts\FormControl;
use Hynek\Form\Exceptions\InvalidControlType;

class FormControlManager
{
    /**
     * @throws InvalidControlType
     */
    public function createControl(string $type): FormControl
    {
        if (! config('form.controls.'.$type)) {
            throw new InvalidControlType('No such control: '.$type);
        }

        return app(config('form.controls.'.$type));
    }
}

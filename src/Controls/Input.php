<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Traits;

class Input extends FormControl
{
    use Traits\HasAttributes,
        Traits\HasContainer,
        Traits\HasError,
        Traits\HasForm,
        Traits\HasHelpText,
        Traits\HasId,
        Traits\HasLabel,
        Traits\HasLivewireModel,
        Traits\HasName,
        Traits\HasPlaceholder,
        Traits\HasRules,
        Traits\HasType,
        Traits\HasValue,
        Traits\HasView,
        Traits\Renderable,
        Traits\Test\InputAssertions;

    public static array $validTypes = [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'date',
        'datetime-local',
        'time',
        'color',
        'file',
        'checkbox',
        'radio',
        'hidden',
        'search',
        'range',
        'month',
        'week',
    ];

    /**
     * {@inheritDoc}
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withId(),
            ...$this->withLabel(),
            ...$this->withName(),
            ...$this->withPlaceholder(),
            ...$this->withError(),
            ...$this->withType(),
            ...$this->withValue(),
            ...$this->withHelpText(),
            ...$this->withLivewireModel(),
            ...$this->withView(),
        ];
    }
}

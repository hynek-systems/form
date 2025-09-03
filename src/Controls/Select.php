<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Traits;

class Select extends FormControl
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
        Traits\HasOptions,
        Traits\HasPlaceholder,
        Traits\HasRules,
        Traits\HasValue,
        Traits\HasView,
        Traits\Renderable,
        Traits\Test\SelectAssertions;

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withId(),
            ...$this->withLabel(),
            ...$this->withName(),
            ...$this->withOptions(),
            ...$this->withPlaceholder(),
            ...$this->withError(),
            ...$this->withValue(),
            ...$this->withHelpText(),
            ...$this->withLivewireModel(),
            ...$this->withView(),
        ];
    }
}

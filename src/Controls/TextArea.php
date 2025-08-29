<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Contracts\ElementContainer;
use Hynek\Form\Contracts\FormControl;
use Hynek\Form\Traits;

class TextArea extends Base implements FormControl
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
        Traits\HasRows,
        Traits\HasRules,
        Traits\HasValue,
        Traits\HasView,
        Traits\Renderable,
        Traits\Test\TextAreaAssertions;

    public static function make(string $name): static
    {
        return (new static)
            ->name($name)
            ->id($name)
            ->container(app(ElementContainer::class));
    }

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
            ...$this->withValue(),
            ...$this->withRows(),
            ...$this->withHelpText(),
            ...$this->withLivewireModel(),
            ...$this->withView(),
        ];
    }
}

<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\FormElement;
use Hynek\Form\Contracts\Label;

class ElementContainer extends Base implements Contracts\ElementContainer
{
    use Traits\HasAttributes,
        Traits\HasElement,
        Traits\HasId,
        Traits\HasLabel,
        Traits\HasName,
        Traits\HasVariants,
        Traits\HasView,
        Traits\Renderable;

    public function boot()
    {
        parent::boot();

        $this->variant = 'block';
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
            ...$this->withElement(),
            ...$this->withVariant(),
            ...$this->withView(),
        ];
    }
}

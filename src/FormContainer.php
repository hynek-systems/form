<?php

namespace Hynek\Form;

use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasElement;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasName;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;

class FormContainer extends Base implements \Hynek\Form\Contracts\ElementContainer
{
    use HasAttributes,
        HasElement,
        HasName,
        HasId,
        HasView,
        Renderable;

    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withElement(),
            ...$this->withName(),
            ...$this->withId(),
            ...$this->withView(),
        ];
    }
}

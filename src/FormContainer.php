<?php

namespace Hynek\Form;

use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasElement;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasName;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;
use Illuminate\Contracts\Support\Arrayable;

class FormContainer extends Base implements Arrayable
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

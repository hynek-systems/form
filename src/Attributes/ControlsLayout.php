<?php

namespace Hynek\Form\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS)]
class ControlsLayout implements \Hynek\Core\Contracts\Attribute
{
    public function __construct(public \Hynek\Form\Enums\ControlsLayout $layout)
    {
    }

    public function key(): string
    {
        return 'controls_layout';
    }

    public function value(): mixed
    {
        return $this->layout->value;
    }
}

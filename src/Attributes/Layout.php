<?php

namespace Hynek\Form\Attributes;

use Attribute;
use Hynek\Core\View\Layouts;

#[Attribute(Attribute::TARGET_CLASS)]
class Layout implements \Hynek\Core\Contracts\Attribute
{

    public function __construct(public string|Layouts $layout) {}

    public function key(): string
    {
        return 'layout';
    }

    public function value(): mixed
    {
        return is_string($this->layout) ? $this->layout : $this->layout->value;
    }
}

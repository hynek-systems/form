<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Controls\Input;
use Illuminate\Support\HtmlString;

trait Renderable
{
    public function render(): string
    {
        if (method_exists($this, 'isRendering')) {
            $this->isRendering();
        }

        return view(
            $this->toArray()['view'],
            $this->toArray()
        )->render();
    }
}

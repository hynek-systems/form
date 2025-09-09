<?php

namespace Hynek\Form\Traits;

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

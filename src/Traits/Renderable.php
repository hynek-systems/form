<?php

namespace Hynek\Form\Traits;

trait Renderable
{
    public function render(): string
    {
        return view(
            $this->toArray()['view'],
            collect($this->toArray())->except(['view'])->toArray()
        )->render();
    }
}

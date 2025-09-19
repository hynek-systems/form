<?php

namespace Hynek\Form\Traits;

trait HasMultiple
{
    protected $multiple = false;

    public function multiple(bool $multiple = true): static
    {
        $this->multiple = $multiple;

        return $this;
    }

    protected function withMultiple(): array
    {
        return ['multiple' => $this->multiple];
    }
}

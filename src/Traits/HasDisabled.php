<?php

namespace Hynek\Form\Traits;

trait HasDisabled
{
    protected bool $disabled = false;

    public function disabled(bool $disabled = true): self
    {
        $this->disabled = $disabled;

        return $this;
    }

    protected function withDisabled(): array
    {
        return ['disabled' => $this->disabled];
    }
}

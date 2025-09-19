<?php

namespace Hynek\Form\Traits;

trait HasRequired
{
    protected bool $required = false;

    public function required(bool $required = true): static
    {
        $this->required = $required;

        return $this;
    }

    protected function withRequired(): array
    {
        return ['required' => $this->required];
    }
}

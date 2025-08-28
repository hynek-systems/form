<?php

namespace Hynek\Form\Traits;

trait HasPlaceholder
{
    protected string $placeholder = '';

    /**
     * Set the placeholder for the form control.
     * @param  string  $placeholder
     * @return $this
     */
    public function placeholder(string $placeholder): static
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    protected function withPlaceholder(): array
    {
        return ['placeholder' => $this->placeholder];
    }
}

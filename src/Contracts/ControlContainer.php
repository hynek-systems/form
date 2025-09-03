<?php

namespace Hynek\Form\Contracts;

interface ControlContainer extends ElementContainer
{
    /**
     * Set the label for the container.
     * @param  Label  $label
     * @return $this
     */
    public function label(string $text, ?array $attributes = null): static;

    public function variant(string $variant): static;
}

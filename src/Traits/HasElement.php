<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\FormElement;

trait HasElement
{
    protected FormElement $element;

    public function element(FormElement $element): static
    {
        $this->element = $element;

        return $this;
    }

    public function getElement(): FormElement
    {
        return $this->element;
    }

    protected function withElement(): array
    {
        return ['element' => $this->element];
    }
}

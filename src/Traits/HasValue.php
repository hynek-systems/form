<?php

namespace Hynek\Form\Traits;

trait HasValue
{
    protected mixed $value = null;

    public function setValue(mixed $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getValue(): mixed
    {
        return $this->value;
    }

    protected function withValue(): array
    {
        return ['value' => $this->getValue()];
    }
}

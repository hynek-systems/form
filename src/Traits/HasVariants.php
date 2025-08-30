<?php

namespace Hynek\Form\Traits;

trait HasVariants
{
    protected string $variant = 'outline';

    public function variant(string $variant): static
    {
        if (!in_array($variant, static::$validVariants, true)) {
            throw new \InvalidArgumentException("Invalid variant: {$variant}");
        }

        $this->variant = $variant;

        return $this;
    }

    protected function withVariant(): array
    {
        return ['variant' => $this->variant];
    }
}

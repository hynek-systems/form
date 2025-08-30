<?php

namespace Hynek\Form\Traits;

trait HasSizes
{
    protected string $size = 'base';

    /**
     * @inheritDoc
     */
    public function size(string $size): static
    {
        if (!in_array($size, self::$validSizes)) {
            throw new \InvalidArgumentException("Invalid size '$size'. Valid sizes are: ".implode(', ', self::$validSizes).".");
        }

        $this->size = $size;

        return $this;
    }

    protected function withSize(): array
    {
        return ['size' => $this->size];
    }
}

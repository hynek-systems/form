<?php

namespace Hynek\Form\Traits;

trait HasType
{
    protected string $type = '';

    public function type(string $type): static
    {
        if (!in_array($type, static::$validTypes, true)) {
            throw new \InvalidArgumentException("Invalid type: {$type}");
        }

        $this->type = $type;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    protected function withType(): array
    {
        return ['type' => $this->getType()];
    }
}

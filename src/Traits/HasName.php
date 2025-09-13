<?php

namespace Hynek\Form\Traits;

trait HasName
{
    protected string $name = '';

    public function name(string $name): static
    {
        $this->name = $name;

        if (method_exists($this, 'id')) {
            $this->id($name);
        }

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    protected function withName(): array
    {
        return ['name' => $this->name];
    }
}

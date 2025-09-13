<?php

namespace Hynek\Form\Traits;

trait HasSuffix
{
    protected ?string $suffix = null;

    public function suffix(string $suffix): static
    {
        $this->suffix = $suffix;

        return $this;
    }

    protected function withSuffix(): array
    {
        return ['suffix' => $this->suffix];
    }
}

<?php

namespace Hynek\Form\Traits;

trait HasPrefix
{
    protected ?string $prefix = null;

    public function prefix(string $prefix): static
    {
        $this->prefix = $prefix;

        return $this;
    }

    protected function withPrefix():array
    {
        return ['prefix' => $this->prefix];
    }
}

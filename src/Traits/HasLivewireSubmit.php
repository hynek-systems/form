<?php

namespace Hynek\Form\Traits;

trait HasLivewireSubmit
{
    protected string $livewireSubmit = '';

    public function livewireSubmit(string $livewireSubmit): static
    {
        $this->livewireSubmit = $livewireSubmit;

        return $this;
    }

    protected function withLivewireSubmit(): array
    {
        return ['livewireSubmit' => $this->livewireSubmit];
    }
}

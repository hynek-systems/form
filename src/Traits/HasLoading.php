<?php

namespace Hynek\Form\Traits;

trait HasLoading
{
    protected bool $loading = false;

    /**
     * @inheritDoc
     */
    public function loading(bool $loading = true): static
    {
        $this->loading = $loading;

        return $this;
    }

    protected function withLoading(): array
    {
        return ['loading' => $this->loading];
    }
}

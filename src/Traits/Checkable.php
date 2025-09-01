<?php

namespace Hynek\Form\Traits;

trait Checkable
{
    protected bool $checked = false;

    public function check(): static
    {
        $this->checked = true;
        return $this;
    }

    public function uncheck(): static
    {
        $this->checked = false;
        return $this;
    }

    public function isChecked(): bool
    {
        return $this->checked;
    }

    protected function withChecked(): array
    {
        return ['checked' => $this->isChecked()];
    }

    public function getValue(): mixed
    {
        return $this->checked ? $this->value : null;
    }
}

<?php

namespace Hynek\Form\Traits;

trait HasText
{
    protected string $text = '';

    public function text(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getText(): string
    {
        return $this->text;
    }

    protected function withText(): array
    {
        return ['text' => $this->text];
    }
}

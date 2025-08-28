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

    protected function withText(): array
    {
        return ['text' => $this->text];
    }
}

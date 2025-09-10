<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\Label;

trait HasLabel
{
    protected ?Label $label = null;

    public function label(string $text, ?array $attributes = null): static
    {
        $this->label = app(Label::class)
            ->text($text)
            ->htmlFor($this->name);

        if ($attributes) {
            $this->label->addAttribute($attributes);
        }

        return $this;
    }

    protected function withLabel(): array
    {
        return ['label' => $this->label];
    }
}

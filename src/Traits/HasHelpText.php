<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\HelpText;

trait HasHelpText
{
    protected HelpText $helpText;

    public function bootHasHelpText()
    {
        $this->helpText = app(HelpText::class);
    }

    public function helpText(string $text, ?array $attributes = null): static
    {
        $this->helpText->text($text);

        if ($attributes) {
            $this->helpText->addAttribute($attributes);
        }

        return $this;
    }

    protected function withHelpText(): array
    {
        return ['helpText' => $this->helpText];
    }
}

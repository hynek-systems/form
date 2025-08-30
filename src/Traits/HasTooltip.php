<?php

namespace Hynek\Form\Traits;

trait HasTooltip
{
    protected array $tooltip = [];

    /**
     * @inheritDoc
     */
    public function tooltip(string $text, ?string $position = 'top', ?string $kbd = null): static
    {
        $this->tooltip = [
            'text' => $text,
            'position' => $position,
            'kbd' => $kbd,
        ];

        return $this;
    }

    protected function withTooltip(): array
    {
        return ['tooltip' => $this->tooltip];
    }
}

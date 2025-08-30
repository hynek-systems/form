<?php

namespace Hynek\Form\Traits;

trait HasIcon
{
    protected ?array $icon = [];

    /**
     * @inheritDoc
     */
    public function icon(string $icon, ?bool $trailing = false, ?string $variant = 'micro'): static
    {
        $this->icon = [
            'name' => $icon,
            'trailing' => $trailing,
            'variant' => $variant,
        ];

        return $this;
    }

    protected function withIcon(): array
    {
        return ['icon' => $this->icon];
    }
}

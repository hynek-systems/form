<?php

namespace Hynek\Form\Traits;

trait HasKeyboardShortcut
{
    protected string $kbd = '';

    /**
     * @inheritDoc
     */
    public function kbd(string $kbd): static
    {
        $this->kbd = $kbd;

        return $this;
    }

    protected function withKbd(): array
    {
        return ['kbd' => $this->kbd];
    }
}

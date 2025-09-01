<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\Button;
use Illuminate\Support\Collection;

class ButtonsCollection extends Collection implements Contracts\ButtonsCollection
{

    public function addButton(Button $button): static
    {
        $this->put($button->getText(), $button);

        return $this;
    }

    public function removeButton(string $text): Button
    {
        $button = $this->getButton($text);

        if (! $button) {
            throw new \InvalidArgumentException("Button with text '{$text}' does not exist.");
        }

        $this->forget([$text]);
        return $button;
    }

    public function getButton(string $text): ?Button
    {
        return $this->get($text);
    }

    public function render(): string
    {
        return $this->map(fn (Button $button) => $button->render())->implode("\n");
    }
}

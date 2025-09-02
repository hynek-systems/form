<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\ButtonsCollection;

trait ManagesButtons
{
    protected ButtonsCollection $buttons;

    public function bootManagesButtons()
    {
        $this->buttons = new \Hynek\Form\ButtonsCollection;
    }

    public function button(string $text, ?string $type = 'button'): static
    {
        $this->buttons->addButton(
            app(config('form.control.button'))
                ->text($text)
                ->type($type)
        );

        return $this;
    }

    public function getButtons(): ButtonsCollection
    {
        return $this->buttons;
    }

    protected function withButtons(): array
    {
        return ['buttons' => $this->buttons];
    }
}

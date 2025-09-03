<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\ElementsCollection;
use Hynek\Form\Contracts\FormElement;

trait ManagesElements
{
    protected ElementsCollection $elements;

    public function bootManagesElements()
    {
        $this->elements = app(ElementsCollection::class);
    }

    public function element(FormElement $element): static
    {
        $element->form($this);

        $this->elements->addElement($element);

        return $this;
    }

    public function getElements(): ElementsCollection
    {
        return $this->elements;
    }

    public function updateValue($elementName, $value): static
    {
        $this->elements->updateValue($elementName, $value);

        return $this;
    }

    protected function withElements(): array
    {
        return ['elements' => $this->elements];
    }
}

<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\FormElement;
use Illuminate\Support\Collection;

class ElementsCollection extends Collection implements Contracts\ElementsCollection
{

    /**
     * @inheritDoc
     */
    public function remove(string $elementName): FormElement
    {
        $element = $this->getElement($elementName);

        $this->forget([$elementName]);

        return $element;
    }

    /**
     * @inheritDoc
     */
    public function getElement(string $elementName): ?FormElement
    {
        return $this->firstWhere('name', $elementName);
    }

    /**
     * @inheritDoc
     */
    public function getFormValues(): mixed
    {
        return $this->mapWithKeys(function (FormElement $element) {
            return [$element->getName() => method_exists($element, 'getValue') ? $element->getValue() : null];
        })->all();
    }

    /**
     * @inheritDoc
     */
    public function render(): string
    {
        return $this->map(fn (FormElement $element) => method_exists($element, 'render') ? $element->render() : '')->implode("\n");
    }

    /**
     * @inheritDoc
     */
    public function getRules(): Collection
    {
        return $this->mapWithKeys(function (FormElement $element) {
            return [$element->getName() => method_exists($element, 'getRules') ? $element->getRules()->toArray() : []];
        });
    }

    public function addElement(FormElement $element): static
    {
        $this->put($element->getName(), $element);

        return $this;
    }
}

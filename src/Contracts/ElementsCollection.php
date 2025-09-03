<?php

namespace Hynek\Form\Contracts;

use Illuminate\Support\Collection;

interface ElementsCollection
{
    /**
     * Add a form element to the collection.
     * @param  FormElement  $element
     * @return $this
     */
    public function addElement(FormElement $element): static;

    /**
     * Remove a form element from the collection by its name.
     * @param  string  $elementName
     * @return FormElement Thee removed element
     */
    public function remove(string $elementName): FormElement;

    /**
     * Get a form element from the collection by its name.
     * @param  string  $elementName
     * @return FormElement|null
     */
    public function getElement(string $elementName): ?FormElement;

    /**
     * Get all form values in the collection.
     * @return mixed
     */
    public function getFormValues(): mixed;

    /**
     * Render the collection of form elements.
     * @return string
     */
    public function render(): string;

    /**
     * Get validation rules for all form elements in the collection.
     * @return Collection
     */
    public function getRules(): Collection;

    public function updateValue(string $elementName, mixed $value): static;
}

<?php

namespace Hynek\Form\Contracts;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;

interface FormBuilder extends Arrayable
{
    /**
     * Add HTML attributes to the element.
     * @param  string|array  $name
     * @param  string|null  $value
     * @return $this
     */
    public function addAttribute(string|array $name, ?string $value = null): static;

    /**
     * Remove an HTML attribute from the element.
     * @param  string  $name
     * @return $this
     */
    public function removeAttribute(string $name): static;

    /**
     * Set the container for the element.
     * @param  ElementContainer  $container
     * @return $this
     */
    public function container(ElementContainer $container): static;

    /**
     * Set the name of the element.
     * @param  string  $name
     * @return $this
     */
    public function name(string $name): static;

    /**
     * Set the id of the element.
     * @param  string  $id
     * @return $this
     */
    public function id(string $id): static;

    /**
     * Set a custom view for rendering the element.
     * @param  string  $view
     * @return $this
     */
    public function view(string $view): static;

    /**
     * Get the name of the element.
     * @return string|null
     */
    public function getName(): ?string;

    /**
     * Get the container of the element.
     * @return ElementContainer|null
     */
    public function getContainer(): ?ElementContainer;

    /**
     * Render the form element as an HTML string.
     * @return string
     */
    public function render(): string;

    public function action(string $action): static;

    public function method(string $method): static;

    public function element(FormElement $element): static;

    public function getElements(): ElementsCollection;

    public function getRules(): Collection;
}

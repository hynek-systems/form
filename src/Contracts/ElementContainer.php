<?php

namespace Hynek\Form\Contracts;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\HtmlString;

interface ElementContainer extends Arrayable
{
    /**
     * Add HTML attributes to the container element.
     * @param  string|array  $name
     * @param  string|null  $value
     * @return $this
     */
    public function addAttribute(string|array $name, ?string $value = null): static;

    /**
     * Remove an HTML attribute from the container element.
     * @param  string  $name
     * @return $this
     */
    public function removeAttribute(string $name): static;

    /**
     * Set the label for the container.
     * @param  Label  $label
     * @return $this
     */
    public function label(string $text, ?array $attributes = null): static;

    /**
     * Set the element of the container.
     * @param FormElement $element
     * @return $this
     */
    public function element(FormElement $element): static;

    /**
     * Get the element of the container.
     * @return FormElement
     */
    public function getElement(): FormElement;

    /**
     * Set the name of the container.
     * @param  string  $name
     * @return $this
     */
    public function name(string $name): static;

    /**
     * Set the id of the container.
     * @param string $id
     * @return $this
     */
    public function id(string $id): static;

    /**
     * Set a custom view for rendering the container.
     * @param  string  $view
     * @return $this
     */
    public function view(string $view): static;

    /**
     * Render the container as an HTML string.
     * @return string
     */
    public function render(): string;

    public function variant(string $variant): static;
}

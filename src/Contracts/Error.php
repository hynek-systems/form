<?php

namespace Hynek\Form\Contracts;

use Illuminate\Contracts\Support\Arrayable;

interface Error extends Arrayable
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
     * Set the error message content.
     * @param  string  $text
     * @return $this
     */
    public function text(string $text): static;

    /**
     * Set the name of the element.
     * @param  string  $name
     * @return $this
     */
    public function name(string $name): static;

    /**
     * Get the name of the element.
     * @return string|null
     */
    public function getName(): ?string;

    /**
     * Set a custom view for rendering the error message.
     * @param  string  $view
     * @return $this
     */
    public function view(string $view): static;

    /**
     * Render the error message as an HTML string.
     * @return string
     */
    public function render(): string;
}

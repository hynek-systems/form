<?php

namespace Hynek\Form\Contracts;

use Illuminate\Contracts\Support\Arrayable;

interface HelpText extends Arrayable
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
     * Set the help text content.
     * @param  string  $text
     * @return $this
     */
    public function text(string $text): static;

    /**
     * Set a custom view for rendering the help text.
     * @param  string  $view
     * @return $this
     */
    public function view(string $view): static;

    /**
     * Render the help text as an HTML string.
     * @return string
     */
    public function render(): string;
}

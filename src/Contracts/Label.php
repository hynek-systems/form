<?php

namespace Hynek\Form\Contracts;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\HtmlString;

interface Label extends Arrayable
{
    /**
     * Add HTML attributes to the label element.
     * @param  string|array  $name
     * @param  string|null  $value
     * @return $this
     */
    public function addAttribute(string|array $name, ?string $value = null): static;

    /**
     * Remove an HTML attribute from the label element.
     * @param  string  $name
     * @return $this
     */
    public function removeAttribute(string $name): static;

    /**
     * Set the text content of the label.
     * @param  string  $text
     * @return $this
     */
    public function text(string $text): static;

    /**
     * Set the 'for' attribute of the label, linking it to a form control.
     * @param  string  $for
     * @return $this
     */
    public function htmlFor(string $for): static;

    /**
     * Set a custom view for rendering the label.
     * @param  string  $view
     * @return $this
     */
    public function view(string $view): static;

    /**
     * Render the label as an HTML string.
     * @return string
     */
    public function render(): string;
}

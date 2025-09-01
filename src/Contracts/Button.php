<?php

namespace Hynek\Form\Contracts;

use Illuminate\Contracts\Support\Arrayable;

interface Button extends FormElement
{
    /**
     * The HTML type attribute of the button. Options: button (default), submit.
     * @param  string  $type
     * @return $this
     */
    public function type(string $type): static;

    /**
     * Get the HTML type attribute of the button.
     * @return string
     */
    public function getType(): string;

    /**
     * Visual style of the button. Options: outline, primary, filled, danger, ghost, subtle. Default: outline.
     * @param  string  $variant
     * @return $this
     */
    public function variant(string $variant): static;

    /**
     * Size of the button. Options: base (default), sm, xs.
     * @param  string  $size
     * @return $this
     */
    public function size(string $size): static;

    /**
     * Show icon in the button.
     * @param  string  $icon Name of the icon to display at the start of the button.
     * @param  bool|null  $trailing Name of the icon to display at the end of the button.
     * @return $this
     */
    public function icon(string $icon, ?bool $trailing = false, ?string $variant = 'micro'): static;

    /**
     * If true, makes the button square. (Useful for icon-only buttons.)
     * @param  bool  $square
     * @return $this
     */
    public function square(bool $square = true): static;

    /**
     * Add negative margins to specific sides. Options: top, bottom, left, right, or any combination of the four.
     * @param  string $inset
     * @return $this
     */
    public function inset(string $inset): static;

    /**
     * If true, shows a loading spinner and disables the button.
     * @param  bool  $loading
     * @return $this
     */
    public function loading(bool $loading = true): static;

    /**
     * Attach a tooltip to the button.
     * @param  string  $text Text to display in a tooltip when hovering over the button.
     * @param  string|null  $position Position of the tooltip. Options: top, bottom, left, right. Default: top.
     * @param  string|null  $kbd Text to display in a keyboard shortcut tooltip when hovering over the button.
     * @return $this
     */
    public function tooltip(string $text, ?string $position = 'top', ?string $kbd = null): static;

    /**
     * Text to display in a keyboard shortcut tooltip when hovering over the button.
     * @param  string  $kbd
     * @return $this
     */
    public function kbd(string $kbd): static;

    /**
     * Set the text of the button.
     * @param  string  $text
     * @return $this
     */
    public function text(string $text): static;

    /**
     * Get the text of the button.
     * @return string|null
     */
    public function getText(): string;
}

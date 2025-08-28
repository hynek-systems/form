<?php

namespace Hynek\Form;

use Hynek\Form\Traits\HasAttributes;

class Label extends Base implements Contracts\Label
{
    use HasAttributes,
        Traits\HasText,
        Traits\HasView,
        Traits\Renderable;

    protected string $htmlFor = '';

    public static function make(string $htmlFor, string $text = ''): static
    {
        return (new static)
            ->htmlFor($htmlFor)
            ->text($text);
    }

    /**
     * {@inheritDoc}
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withText(),
            ...$this->withView(),
            'htmlFor' => $this->htmlFor,
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function htmlFor(string $for): static
    {
        $this->htmlFor = $for;

        return $this;
    }
}

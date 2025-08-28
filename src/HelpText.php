<?php

namespace Hynek\Form;

use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasText;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;

class HelpText extends Base implements Contracts\HelpText
{
    use HasAttributes,
        HasText,
        HasView,
        Renderable;

    public static function make(string $text = ''): static
    {
        return (new static)
            ->text($text);
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withText(),
            ...$this->withView(),
        ];
    }
}

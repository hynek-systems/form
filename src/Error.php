<?php

namespace Hynek\Form;

class Error extends Base implements Contracts\Error
{
    use Traits\HasAttributes,
        Traits\HasText,
        Traits\HasView,
        Traits\Renderable;

    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withText(),
            ...$this->withView(),
        ];
    }
}

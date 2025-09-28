<?php

namespace Hynek\Form\EditorJS;

class Header extends Tool
{
    public function __construct(public ?string $shortcut = 'CMD+SHIFT+H')
    {
        $this->key = 'header';
        $this->class = 'Header';
    }
}

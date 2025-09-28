<?php

namespace Hynek\Form\EditorJS;

class Embed extends Tool
{
    public function __construct(public bool $inlineToolbar = true)
    {
        $this->key = 'embed';
        $this->class = 'Embed';
    }
}

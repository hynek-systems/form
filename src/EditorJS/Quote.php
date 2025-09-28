<?php

namespace Hynek\Form\EditorJS;

class Quote extends Tool
{
    public function __construct(
        public bool $inlineToolbar = true,
        public string $shortcut = 'CMD+SHIFT+O'
    )
    {
        $this->key = 'quote';
        $this->class = 'Quote';
    }
}

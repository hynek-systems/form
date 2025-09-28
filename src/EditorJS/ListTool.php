<?php

namespace Hynek\Form\EditorJS;

class ListTool extends Tool
{
    public function __construct(
        public bool $inlineToolbar = true
    ) {
        $this->key = 'list';
        $this->class = 'EditorjsList';
    }
}

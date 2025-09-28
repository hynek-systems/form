<?php

namespace Hynek\Form\EditorJS;

class ListToolConfig extends Config
{
    public function __construct(
        // ordered, unordered or checklist
        public string $defaultStyle = 'unordered',
        // maximum level of the list nesting, could be set to 1 to disable nesting, unlimited by default
        public ?int $maxLevel = null,
        // string[]. ['numeric','upper-roman'], default is undefined
        public ?string $counterTypes = null
    ) {}
}

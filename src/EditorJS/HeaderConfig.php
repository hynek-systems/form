<?php

namespace Hynek\Form\EditorJS;

class HeaderConfig extends Config
{
    public function __construct(
        public array $levels = [2, 3, 4],
        public int $defaultLevel = 2,
        public ?string $placeholder = null
    )
    {
    }
}

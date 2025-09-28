<?php

namespace Hynek\Form\EditorJS;

class QuoteConfig
{
    public function __construct(
        public ?string $quotePlaceholder = null,
        public ?string $captionPlaceholder = null
    )
    {
    }
}

<?php

namespace Hynek\Form\Traits\Test;

trait ButtonAssertions
{
    use AssertAttrributes,
        AssertIcon,
        AssertKeyboardShortcut,
        AssertLoading,
        AssertName,
        AssertText,
        AssertTooltip,
        AssertType,
        AssertVariants,
        AssertSize;
}

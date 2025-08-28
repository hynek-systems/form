<?php

namespace Hynek\Form\Traits\Test;

trait InputAssertions
{
    use AssertAttrributes,
        AssertHelpText,
        AssertId,
        AssertLabel,
        AssertName,
        AssertPlaceholder,
        AssertRules,
        AssertType,
        AssertValue;
}

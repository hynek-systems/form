<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertAttrributes
{
    public function assertAttributes(array $expectedAttributes): self
    {
        Assert::assertEquals($expectedAttributes, $this->attributes->toArray());

        return $this;
    }
}

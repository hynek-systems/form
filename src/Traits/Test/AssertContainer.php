<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertContainer
{
    public function assertContainer($expectedContainer): self
    {
        Assert::assertInstanceOf($expectedContainer, $this->getContainer());

        return $this;
    }
}

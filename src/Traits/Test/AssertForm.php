<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertForm
{
    public function assertForm($expectedForm): self
    {
        Assert::assertInstanceOf($expectedForm, $this->getForm());

        return $this;
    }
}

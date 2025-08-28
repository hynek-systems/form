<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertValue
{
    public function assertValue(mixed $value): self
    {
        Assert::assertSame($value, $this->value);

        return $this;
    }
}

<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertType
{
    public function assertType(string $type): self
    {
        Assert::assertSame($type, $this->getType());

        return $this;
    }
}

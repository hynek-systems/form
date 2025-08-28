<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertName
{
    public function assertName(string $name): self
    {
        Assert::assertSame($name, $this->getName());

        return $this;
    }
}

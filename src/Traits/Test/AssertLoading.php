<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertLoading
{
    public function assertLoading(bool $expected): self
    {
        Assert::assertSame($expected, $this->loading);

        return $this;
    }
}

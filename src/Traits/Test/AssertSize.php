<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertSize
{
    public function assertSize(string $expected): self
    {
        Assert::assertSame($expected, $this->size);

        return $this;
    }
}

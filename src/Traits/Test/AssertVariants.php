<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertVariants
{
    public function assertVariant(string $expected): self
    {
        Assert::assertSame($expected, $this->variant);

        return $this;
    }
}

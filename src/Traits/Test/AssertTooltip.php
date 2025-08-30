<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertTooltip
{
    public function assertTooltip(array $expected): self
    {
        Assert::assertIsArray($this->tooltip);
        Assert::assertEquals($expected, $this->tooltip);

        return $this;
    }
}

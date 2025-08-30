<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertIcon
{
    public function assertIcon(array $expected): self
    {
        Assert::assertIsArray($this->icon);
        Assert::assertEquals($expected, $this->icon);

        return $this;
    }
}

<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertOptions
{
    public function assertOptions(array $expectedOptions): self
    {
        Assert::assertEquals($expectedOptions, $this->options->toArray());

        return $this;
    }
}

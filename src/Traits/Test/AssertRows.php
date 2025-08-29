<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertRows
{
    public function assertRows($rows): self
    {
        Assert::assertSame($rows, $this->rows);

        return $this;
    }
}

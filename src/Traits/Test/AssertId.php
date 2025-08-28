<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertId
{
    public function assertId(string $id): self
    {
        Assert::assertSame($id, $this->id);

        return $this;
    }
}

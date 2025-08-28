<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertPlaceholder
{
    public function assertPlaceholder(string $placeholder): self
    {
        Assert::assertSame($placeholder, $this->placeholder);

        return $this;
    }
}

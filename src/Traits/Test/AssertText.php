<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertText
{
    public function assertText(string $expected): self
    {
        Assert::assertSame($expected, $this->text);

        return $this;
    }
}

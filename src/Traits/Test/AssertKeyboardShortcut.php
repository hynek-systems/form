<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertKeyboardShortcut
{
    public function assertKbd(string $expected): self
    {
        Assert::assertSame($expected, $this->kbd);

        return $this;
    }
}

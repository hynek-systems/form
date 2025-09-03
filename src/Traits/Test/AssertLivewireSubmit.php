<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertLivewireSubmit
{
    public function assertLivewireSubmit(string $expected): self
    {
        Assert::assertSame($expected, $this->livewireSubmit);

        return $this;
    }
}

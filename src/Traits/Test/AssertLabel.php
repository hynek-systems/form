<?php

namespace Hynek\Form\Traits\Test;

use Hynek\Form\Contracts\Label;
use PHPUnit\Framework\Assert;

trait AssertLabel
{
    public function assertLabel(string $text): self
    {
        Assert::assertInstanceOf(Label::class, $this->label);
        Assert::assertSame($text, $this->label->toArray()['text'] ?? null);

        return $this;
    }
}

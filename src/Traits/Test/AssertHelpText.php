<?php

namespace Hynek\Form\Traits\Test;

use Hynek\Form\Contracts\HelpText;
use PHPUnit\Framework\Assert;

trait AssertHelpText
{
    public function assertHelpText(string $text): self
    {
        Assert::assertInstanceOf(HelpText::class, $this->helpText);
        Assert::assertSame($text, $this->helpText->toArray()['text'] ?? null);

        return $this;
    }
}

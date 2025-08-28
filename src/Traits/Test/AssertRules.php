<?php

namespace Hynek\Form\Traits\Test;

use PHPUnit\Framework\Assert;

trait AssertRules
{
    public function assertRules(array $expectedRules): self
    {
        $rules = $this->getRules()->toArray();

        Assert::assertEquals($expectedRules, $rules);

        return $this;
    }
}

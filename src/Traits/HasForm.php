<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\FormBuilder;

trait HasForm
{
    protected FormBuilder $builder;

    public function form(FormBuilder $builder): static
    {
        $this->builder = $builder;

        return $this;
    }

    public function getForm(): FormBuilder
    {
        return $this->builder;
    }
}

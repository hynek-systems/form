<?php

namespace Hynek\Form\Livewire;

use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Traits\HasView;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Livewire\Component;

abstract class Form extends Component implements \Hynek\Form\Contracts\Form
{
    use HasView;

    protected FormBuilder $builder;

    public array $fields = [];

    protected Collection $elements;

    abstract public function fields(): array;

    public function render(): string
    {
        return view($this->view);
    }

    public function validate(): array
    {
        return parent::validate($this->builder->getRules());
    }

    public function getBuilder(): FormBuilder
    {
        return $this->builder;
    }

    public function extendFields(array $fields): static
    {
        $this->elements = $this->elements->merge($fields);

        return $this;
    }

    public function updated($property, $value): void
    {
        $this->builder->updateValue(Str::after($property, 'fields.'), $value);
    }
}

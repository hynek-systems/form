<?php

namespace Hynek\Form\Contracts;

interface CheckboxGroup extends FormElement
{
    public function checkbox(Checkbox $checkbox): static;

    public function removeCheckbox(string $name): static;

    public function getCheckboxes(): ElementsCollection;

    public function enableCheckAll(): static;

    public function disableCheckAll(): static;

    public function label(string $text, ?array $attributes = null): static;

    public function setLivewireModel(string $model): static;

    public function helpText(string $text, ?array $attributes = null): static;

    public function errorMessage(string $text, ?array $attributes = null): static;

    public function form(FormBuilder $builder): static;

    public function getForm(): FormBuilder;
}

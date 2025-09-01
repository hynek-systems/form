<?php

namespace Hynek\Form\Contracts;

interface RadioGroup extends FormElement
{
    public function radio(Radio $radio): static;

    public function removeRadio(string $name): static;

    public function getRadios(): ElementsCollection;

    public function label(string $text, ?array $attributes = null): static;

    public function setLivewireModel(string $model): static;

    public function helpText(string $text, ?array $attributes = null): static;

    public function errorMessage(string $text, ?array $attributes = null): static;

    public function form(FormBuilder $builder): static;

    public function getForm(): FormBuilder;
}

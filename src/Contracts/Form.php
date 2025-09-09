<?php

namespace Hynek\Form\Contracts;

interface Form
{
    public function fields(): array;

    public function render(): string;

    public function validate(): array;

    public function getBuilder(): FormBuilder;

    public function extendFields(array $fields): static;

    public function fill(array $data): static;

    public function livewireSubmit(): string;

    public function action(): string;

    public function method(): string;

    public function useHtmx(): bool;
}

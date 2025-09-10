<?php

namespace Hynek\Form\Contracts;

use Hynek\Form\Enums\FormMethods;
use Illuminate\Contracts\View\View;

interface Form
{
    public function fields(): array;

    public function render(): View;

    public function validate(): array;

    public function getBuilder(): FormBuilder;

    public function extendFields(array $fields): static;

    public function fill(array $data): static;

    public function livewireSubmit(): string;

    public function action(?string $action = null): string;

    public function method(?FormMethods $method = null): FormMethods;

    public function useHtmx(): bool;
}

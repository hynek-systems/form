<?php

namespace Hynek\Form\Contracts;

use Hynek\Form\Enums\FormMethods;
use Illuminate\Contracts\View\View;

interface Form
{
    public function fields(): array;

    public function buttons(): array;

    public function render(?array $data = []): View;

    public function renderFragment(string $fragment, ?array $data = []): string;

    public function validate(): array;

    public function getBuilder(): FormBuilder;

    public function extendFields(array $fields): static;

    public function fill(array $data): static;

    public function livewireSubmit(): string;

    public function action(?string $action = null): string;

    public function method(?FormMethods $method = null): FormMethods;

    public function useHtmx(): bool;

    public function title(): ?string;

    public function addAttribute(string|array $name, ?string $value = null): static;

    public function getName(): string;

    public function getView();

    public function withoutLayout(): static;
}

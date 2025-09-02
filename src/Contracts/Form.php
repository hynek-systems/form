<?php

namespace Hynek\Form\Contracts;

interface Form
{
    public function fields(): array;

    public function render(): string;

    public function validate(): array;

    public function getBuilder(): FormBuilder;

    public function extendFields(array $fields): static;

    /**
     * Enable form submission over AJAX/XHR
     * @return $this
     */
    public function enableAjax(): static;

    /**
     * Disable form submission over AJAX/XHR
     * @return $this
     */
    public function disableAjax(): static;
}

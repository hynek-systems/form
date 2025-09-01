<?php

namespace Hynek\Form\Contracts;

interface ButtonsCollection
{
    public function addButton(Button $button): static;

    public function removeButton(string $text): Button;

    public function getButton(string $text): ?Button;

    public function render(): string;
}

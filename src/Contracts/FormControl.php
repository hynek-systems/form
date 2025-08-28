<?php

namespace Hynek\Form\Contracts;

use Illuminate\Support\Collection;

interface FormControl extends FormElement
{
    /**
     * Set the label for the form control.
     * @param  string  $text
     * @param  array|null  $attributes
     * @return $this
     */
    public function label(string $text, ?array $attributes = null): static;

    /**
     * Set the placeholder for the form control.
     * @param  string  $placeholder
     * @return $this
     */
    public function placeholder(string $placeholder): static;

    /**
     * Set the help text for the form control.
     * @param  string  $text
     * @param  array|null  $attributes
     * @return $this
     */
    public function helpText(string $text, ?array $attributes = null): static;

    /**
     * Set the error message for the form control.
     * @param  string  $text
     * @param  array|null  $attributes
     * @return $this
     */
    public function errorMessage(string $text, ?array $attributes = null): static;

    /**
     * Set the value of the form control.
     * @param  mixed  $value
     * @return $this
     */
    public function setValue(mixed $value): static;

    /**
     * Get the value of the form control.
     * @return mixed
     */
    public function getValue(): mixed;

    /**
     * Set the Livewire model binding for the form control.
     * @param  string  $model
     * @return $this
     */
    public function setLivewireModel(string $model): static;

    public function rules(array $rules): static;

    public function getRules(): Collection;
}

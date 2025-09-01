<?php

namespace Hynek\Form\Contracts;

use Illuminate\Support\Collection;

interface FormControl extends FormElement
{
    /**
     * Set the container for the element.
     * @param  ElementContainer  $container
     * @return $this
     */
    public function container(ElementContainer $container): static;

    /**
     * Get the container of the element.
     * @return ElementContainer
     */
    public function getContainer(): ElementContainer;

    /**
     * Set the name of the element.
     * @param  string  $name
     * @return $this
     */
    public function name(string $name): static;

    /**
     * Get the name of the element.
     * @return string|null
     */
    public function getName(): ?string;

    public function form(FormBuilder $builder): static;

    public function getForm(): FormBuilder;

    /**
     * Set the label for the form control.
     * @param  string  $text
     * @param  array|null  $attributes
     * @return $this
     */
    public function label(string $text, ?array $attributes = null): static;

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

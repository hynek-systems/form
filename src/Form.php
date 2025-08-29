<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Contracts\FormElement;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

abstract class Form extends Base implements Contracts\Form
{
    protected Collection $fields;

    protected FormBuilder $builder;

    public function __construct()
    {
        parent::__construct();

        $this->fields = collect($this->fields());
        $this->builder = app(FormBuilder::class);
    }

    protected function resolveFields()
    {
        foreach ($this->fields as $name => $field) {
            if (is_array($field)) {
                $element = $this->buildElement($name, $field);
                $this->builder->addElement($element);
            } elseif ($field instanceof FormElement) {
                $field->name($name);
                $this->builder->addElement($field);
            } else {
                throw new \InvalidArgumentException("Field {$name} must be an array or instance of ".FormElement::class);
            }
        }
    }

    protected function buildElement(string $name, array $field): FormElement
    {
        $element = app($field['type']);
        $element->name($name);

        foreach ($field as $prop) {
            $setMethod = 'set'.ucfirst($prop);
            if (method_exists($this, $setMethod)) {
                $element->$setMethod($field[$prop]);
            } elseif (method_exists($element, $prop)) {
                $element->$prop($field[$prop]);
            } else {
                throw new \InvalidArgumentException("Method {$prop} does not exist on ".get_class($element));
            }
        }

        return $element;
    }

    abstract public function fields(): array;

    abstract public function rules(): array;

    public function render(): string
    {
        $this->resolveFields();

        return $this->builder->render();
    }

    public function validate(): array
    {
        $formValues = $this->builder->getElements()->getFormValues();

        return Validator::make($formValues, $this->builder->getRules()->toArray())->validate();
    }

    public function getBuilder(): FormBuilder
    {
        return $this->builder;
    }

    public function extendFields(array $fields): static
    {
        $this->fields = $this->fields->merge($fields);

        return $this;
    }
}

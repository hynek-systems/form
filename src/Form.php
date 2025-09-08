<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Contracts\FormElement;
use Hynek\Form\Traits\AjaxSubmission;
use Hynek\Form\Traits\HasView;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

abstract class Form extends Base implements Contracts\Form
{
    use AjaxSubmission,
        HasView;

    protected Collection $fields;

    protected FormBuilder $builder;

    public static function fromData(\Spatie\LaravelData\Data $data): static
    {
        $form = new static;
        $form->fill($data->toArray());

        return $form;
    }

    public static function fromModel(Model $model): static
    {
        $form = new static();
        $form->fill($model->getAttributes());

        return $form;
    }

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
        $element = app('form.control'.$field['element']);
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

    public function render(): string
    {
        $this->resolveFields();

        return $this->builder->view($this->view, ['elements' => $this->fields])->render();
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

    public function fill(array $data): static
    {
        foreach ($data as $key => $value) {
            if (! array_key_exists($key, $this->fields)) {
                continue;
            }

            data_set($this->fields, "$key.value", $value);
        }

        return $this;
    }
}

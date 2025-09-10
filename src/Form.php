<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Contracts\FormElement;
use Hynek\Form\Enums\FormMethods;
use Hynek\Form\Traits\AjaxSubmission;
use Hynek\Form\Traits\HasView;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\LaravelData\Data;

abstract class Form extends Base implements Contracts\Form
{
    use AjaxSubmission,
        HasView;

    protected Collection $fields;

    protected FormBuilder $builder;

    protected FormMethods $method;

    protected string $action;

    public static function fromData(Data $data): static
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
        $this->bootForm();
    }

    abstract protected function bootForm(): void;

    protected function resolveFields()
    {
        foreach ($this->fields as $name => $field) {
            if (is_array($field)) {
                $element = $this->buildElement($name, $field);
                $this->builder->element($element);
            } elseif ($field instanceof FormElement) {
                $field->name($name);
                $this->builder->element($field);
            } else {
                throw new \InvalidArgumentException("Field {$name} must be an array or instance of ".FormElement::class);
            }
        }
    }

    protected function buildElement(string $name, array $field): FormElement
    {
        $element = app('form.control.'.$field['element'], ['name' => $name]);

        foreach ($field as $prop => $value) {
            if ($prop === 'element') {
                continue;
            }

            $setMethod = 'set'.ucfirst($prop);
            if (method_exists($this, $setMethod)) {
                $element->$setMethod($value);
            } elseif (method_exists($element, $prop)) {
                $element->$prop($value);
            } else {
                throw new \InvalidArgumentException("Method {$prop} does not exist on ".get_class($element));
            }
        }

        return $element;
    }

    abstract public function fields(): array;

    /**
     * @throws \Throwable
     */
    public function render(): View
    {
        $this->resolveFields();
        $livewireSubmit = $this->livewireSubmit();
        $this->builder->action($this->action);
        $this->builder->method($this->method->value);

        if ($this->useHtmx()) {
            $attribute = 'hx-'.Str::lower($this->method->value);
            $this->builder->addAttribute($attribute, $this->action);
        }

        if (! blank($livewireSubmit)) {
            $this->builder->livewireSubmit($livewireSubmit);
        }

        return view(
            $this->view,
            $this->builder->toArray()
        );
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

    public function livewireSubmit(): string
    {
        return '';
    }

    public function action(?string $action = null): string
    {
        if (! is_null($action)) {
            $this->action = $action;
        }

        return $this->action;
    }

    public function method(?FormMethods $method = null): FormMethods
    {
        if (! is_null($method)) {
            $this->method = $method;
        }

        return $this->method;
    }

    public function useHtmx(): bool
    {
        return false;
    }
}

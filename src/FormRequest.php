<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\Form;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Mauricius\LaravelHtmx\Http\HtmxRequest;

abstract class FormRequest extends LaravelFormRequest
{
    protected Form|string|null $form = null;

    public function getForm(): Form|string|null
    {
        return $this->form;
    }

    protected function resolveForm(): Form
    {
        return $this->form instanceof Form
            ? $this->form
            : app(FormRegistry::class)->get($this->form);
    }

    public function rules(): array
    {
        return $this->resolveForm()->getBuilder()->getRules()->toArray();
    }

    protected function failedValidation(Validator $validator)
    {
        if (app(HtmxRequest::class)->isHtmxRequest()) {
            // Get the form instance - either from property or registry
            $form = $this->resolveForm();

            $response = response(
                $form->withoutLayout()->render(
                    [
                        'errors' => $validator->errors(),
                        'old' => $this->all(),
                    ]
                )
            );

            throw new HttpResponseException($response);
        }

        parent::failedValidation($validator);
    }
}

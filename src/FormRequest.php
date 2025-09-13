<?php

namespace Hynek\Form;

use Hynek\Form\Contracts\Form;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Mauricius\LaravelHtmx\Http\HtmxRequest;

class FormRequest extends LaravelFormRequest
{
    protected Form $form;

    protected function failedValidation(Validator $validator)
    {
        if (app(HtmxRequest::class)->isHtmxRequest()) {
            $response = response(
                $this->form->renderFragment(
                    $this->form->getName(),
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

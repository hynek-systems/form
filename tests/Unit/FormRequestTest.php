<?php

use Hynek\Form\Contracts\Form;
use Hynek\Form\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\MessageBag;
use Mauricius\LaravelHtmx\Http\HtmxRequest;

beforeEach(function () {
    $this->formRequest = new class extends FormRequest {
        protected function rules()
        {
            return [
                'name' => 'required|string|min:3',
                'email' => 'required|email',
            ];
        }
        
        protected function authorize()
        {
            return true;
        }
    };
});

test('form request extends laravel form request', function () {
    expect($this->formRequest)->toBeInstanceOf(\Illuminate\Foundation\Http\FormRequest::class);
});

test('failed validation throws http response exception for htmx requests', function () {
    // Mock the HtmxRequest to return true for isHtmxRequest
    $htmxRequestMock = \Mockery::mock(HtmxRequest::class);
    $htmxRequestMock->shouldReceive('isHtmxRequest')->andReturn(true);
    $this->app->instance(HtmxRequest::class, $htmxRequestMock);

    // Mock the Form
    $formMock = \Mockery::mock(Form::class);
    $formMock->shouldReceive('getName')->andReturn('test_form');
    $formMock->shouldReceive('renderFragment')
        ->with('test_form', \Mockery::on(function ($data) {
            return isset($data['errors']) && isset($data['old']) &&
                   $data['errors'] instanceof MessageBag &&
                   is_array($data['old']);
        }))
        ->andReturn('<div>Form with errors</div>');

    // Set the form property using reflection
    $reflection = new \ReflectionClass($this->formRequest);
    $formProperty = $reflection->getProperty('form');
    $formProperty->setAccessible(true);
    $formProperty->setValue($this->formRequest, $formMock);

    // Mock the validator
    $validatorMock = \Mockery::mock(Validator::class);
    $errors = new MessageBag(['name' => 'Name is required']);
    $validatorMock->shouldReceive('errors')->andReturn($errors);

    // Set up request data
    $this->formRequest->merge(['email' => 'invalid-email']);

    // Call the protected method using reflection
    $reflection = new \ReflectionClass($this->formRequest);
    $method = $reflection->getMethod('failedValidation');
    $method->setAccessible(true);

    expect(fn() => $method->invoke($this->formRequest, $validatorMock))
        ->toThrow(HttpResponseException::class);
});

test('failed validation calls parent method for non-htmx requests', function () {
    // Mock the HtmxRequest to return false for isHtmxRequest
    $htmxRequestMock = \Mockery::mock(HtmxRequest::class);
    $htmxRequestMock->shouldReceive('isHtmxRequest')->andReturn(false);
    $this->app->instance(HtmxRequest::class, $htmxRequestMock);

    // Create a custom FormRequest that tracks parent method calls
    $formRequest = new class extends FormRequest {
        public $parentFailedValidationCalled = false;
        
        protected function rules()
        {
            return ['name' => 'required'];
        }
        
        protected function authorize()
        {
            return true;
        }
        
        protected function failedValidation(Validator $validator)
        {
            try {
                parent::failedValidation($validator);
            } catch (\Exception $e) {
                $this->parentFailedValidationCalled = true;
                throw $e;
            }
        }
    };

    // Mock the validator
    $validatorMock = \Mockery::mock(Validator::class);
    $errors = new MessageBag(['name' => 'Name is required']);
    $validatorMock->shouldReceive('errors')->andReturn($errors);

    // Call the failedValidation method
    $reflection = new \ReflectionClass($formRequest);
    $method = $reflection->getMethod('failedValidation');
    $method->setAccessible(true);

    try {
        $method->invoke($formRequest, $validatorMock);
    } catch (\Exception $e) {
        // Expected to throw an exception from parent
    }

    expect($formRequest->parentFailedValidationCalled)->toBeTrue();
});

test('failed validation for htmx request returns correct response content', function () {
    // Mock the HtmxRequest to return true for isHtmxRequest
    $htmxRequestMock = \Mockery::mock(HtmxRequest::class);
    $htmxRequestMock->shouldReceive('isHtmxRequest')->andReturn(true);
    $this->app->instance(HtmxRequest::class, $htmxRequestMock);

    // Mock the Form
    $expectedFragmentContent = '<div class="form-errors">Validation failed</div>';
    $formMock = \Mockery::mock(Form::class);
    $formMock->shouldReceive('getName')->andReturn('test_form');
    $formMock->shouldReceive('renderFragment')
        ->with('test_form', \Mockery::type('array'))
        ->andReturn($expectedFragmentContent);

    // Set the form property
    $reflection = new \ReflectionClass($this->formRequest);
    $formProperty = $reflection->getProperty('form');
    $formProperty->setAccessible(true);
    $formProperty->setValue($this->formRequest, $formMock);

    // Mock the validator
    $validatorMock = \Mockery::mock(Validator::class);
    $errors = new MessageBag(['name' => 'Name is required']);
    $validatorMock->shouldReceive('errors')->andReturn($errors);

    // Set up request data
    $this->formRequest->merge(['email' => 'invalid-email']);

    // Call the protected method using reflection
    $reflection = new \ReflectionClass($this->formRequest);
    $method = $reflection->getMethod('failedValidation');
    $method->setAccessible(true);

    try {
        $method->invoke($this->formRequest, $validatorMock);
    } catch (HttpResponseException $e) {
        $response = $e->getResponse();
        expect($response->getContent())->toBe($expectedFragmentContent);
        expect($response->getStatusCode())->toBe(200);
    }
});

test('form request passes form data to renderFragment correctly', function () {
    // Mock the HtmxRequest
    $htmxRequestMock = \Mockery::mock(HtmxRequest::class);
    $htmxRequestMock->shouldReceive('isHtmxRequest')->andReturn(true);
    $this->app->instance(HtmxRequest::class, $htmxRequestMock);

    // Mock the Form with specific expectations
    $formMock = \Mockery::mock(Form::class);
    $formMock->shouldReceive('getName')->andReturn('user_form');
    
    $requestData = ['name' => 'John', 'email' => 'invalid'];
    $errorBag = new MessageBag(['email' => 'Invalid email format']);
    
    $formMock->shouldReceive('renderFragment')
        ->with('user_form', [
            'errors' => $errorBag,
            'old' => $requestData,
        ])
        ->once()
        ->andReturn('<div>Form content</div>');

    // Set the form property
    $reflection = new \ReflectionClass($this->formRequest);
    $formProperty = $reflection->getProperty('form');
    $formProperty->setAccessible(true);
    $formProperty->setValue($this->formRequest, $formMock);

    // Set up request data
    $this->formRequest->merge($requestData);

    // Mock the validator
    $validatorMock = \Mockery::mock(Validator::class);
    $validatorMock->shouldReceive('errors')->andReturn($errorBag);

    // Call the protected method
    $reflection = new \ReflectionClass($this->formRequest);
    $method = $reflection->getMethod('failedValidation');
    $method->setAccessible(true);

    expect(fn() => $method->invoke($this->formRequest, $validatorMock))
        ->toThrow(HttpResponseException::class);
});

test('form request can be instantiated with form property', function () {
    $formMock = \Mockery::mock(Form::class);
    
    $formRequest = new class extends FormRequest {
        public function setForm($form) {
            $this->form = $form;
        }
        
        protected function rules() {
            return ['name' => 'required'];
        }
        
        protected function authorize() {
            return true;
        }
    };
    
    $formRequest->setForm($formMock);
    
    // Use reflection to check the form property
    $reflection = new \ReflectionClass($formRequest);
    $formProperty = $reflection->getProperty('form');
    $formProperty->setAccessible(true);
    
    expect($formProperty->getValue($formRequest))->toBe($formMock);
});

afterEach(function () {
    \Mockery::close();
});

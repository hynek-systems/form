<?php

beforeEach(function () {
    $this->input = app('form.control.input', ['name' => 'my-input']);
});

test('that Input can be created', function () {
    expect($this->input)->toBeInstanceOf(\Hynek\Form\Controls\Input::class);
});

test('that input has correct name', function () {
    $this->input->name('username')->assertName('username');
});

test('that input has correct placeholder', function () {
    $this->input->placeholder('Enter your username')->assertPlaceholder('Enter your username');
});

test('that input has correct type', function () {
    $this->input->type('email')->assertType('email');
});

test('that input has correct id', function () {
    $this->input->id('user-id')->assertId('user-id');
});

test('that input has correct value', function () {
    $this->input->setValue('test-value')->assertValue('test-value');
});

test('that input has correct label', function () {
    $this->input->label('User Name')->assertLabel('User Name');
});

test('that input has correct help text', function () {
    $this->input->helpText('This is help text')->assertHelpText('This is help text');
});

test('that input has correct rules', function () {
    $this->input->rules(['required', 'email'])->assertRules(['required', 'email']);
});

test('that input has correct attributes', function () {
    $this->input->addAttribute('data-test', 'value')->assertAttributes(['data-test' => 'value']);
});

test('that input has a container', function () {
    $this->input->container(app(\Hynek\Form\Contracts\ControlContainer::class))
        ->assertContainer(\Hynek\Form\Contracts\ControlContainer::class);
});

test('that input is attached to a form', function () {
    $this->input->form(app(\Hynek\Form\Contracts\FormBuilder::class))
        ->assertForm(\Hynek\Form\Contracts\FormBuilder::class);
});

test('that input can be rendered to array', function () {
    $this->input
        ->name('username')
        ->type('text')
        ->id('user-id')
        ->placeholder('Enter your username')
        ->setValue('test-value')
        ->label('User Name')
        ->helpText('This is help text')
        ->addAttribute('data-test', 'value');

    $array = $this->input->toArray();

    expect($array)->toBeArray()
        ->toHaveKey('name', 'username')
        ->toHaveKey('type', 'text')
        ->toHaveKey('id', 'user-id')
        ->toHaveKey('placeholder', 'Enter your username')
        ->toHaveKey('value', 'test-value')
        ->toHaveKey('label')
        ->toHaveKey('helpText')
        ->toHaveKey('_attributes');
});

test('that input can be rendered to string', function () {
    $this->input
        ->name('username')
        ->type('text')
        ->id('user-id')
        ->placeholder('Enter your username')
        ->setValue('test-value')
        ->label('User Name')
        ->helpText('This is help text')
        ->addAttribute('data-test', 'value');

    $string = $this->input->render();

    expect($string)->toBeString();
});

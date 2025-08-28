<?php

beforeEach(function () {
    $this->input = app('form.control.input');
});

test('that Input can be created', function () {
    $this->assertInstanceOf(\Hynek\Form\Controls\Input::class, $this->input);
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


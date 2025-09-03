<?php

beforeEach(function () {
    $this->textarea = app('form.control.textarea');
});

test('that textarea can be created', function () {
    expect($this->textarea)->toBeInstanceOf(\Hynek\Form\Controls\TextArea::class);
});

test('that textarea has correct name', function () {
    $this->textarea->name('username')->assertName('username');
});

test('that textarea has correct placeholder', function () {
    $this->textarea->placeholder('Enter your username')->assertPlaceholder('Enter your username');
});

test('that textarea has correct id', function () {
    $this->textarea->id('user-id')->assertId('user-id');
});

test('that textarea has correct value', function () {
    $this->textarea->setValue('test-value')->assertValue('test-value');
});

test('that textarea has correct label', function () {
    $this->textarea->label('User Name')->assertLabel('User Name');
});

test('that textarea has correct help text', function () {
    $this->textarea->helpText('This is help text')->assertHelpText('This is help text');
});

test('that textarea has correct rules', function () {
    $this->textarea->rules(['required', 'email'])->assertRules(['required', 'email']);
});

test('that textarea has correct attributes', function () {
    $this->textarea->addAttribute('data-test', 'value')->assertAttributes(['data-test' => 'value']);
});

test('that textarea has a container', function () {
    $this->textarea->container(app(\Hynek\Form\Contracts\ControlContainer::class))
        ->assertContainer(\Hynek\Form\Contracts\ControlContainer::class);
});

test('that textarea is attached to a form', function () {
    $this->textarea->form(app(\Hynek\Form\Contracts\FormBuilder::class))
        ->assertForm(\Hynek\Form\Contracts\FormBuilder::class);
});

test('that testarea has rows', function () {
    $this->textarea->rows(10)->assertRows(10);
    $this->textarea->rows('auto')->assertRows('auto');
});


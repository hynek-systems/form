<?php

beforeEach(function () {
    $this->select = app('form.control.select');
});

test('that select can be created', function () {
    expect($this->select)->toBeInstanceOf(\Hynek\Form\Controls\Select::class);
});

test('that select has correct name', function () {
    $this->select->name('username')->assertName('username');
});

test('that select has correct placeholder', function () {
    $this->select->placeholder('Enter your username')->assertPlaceholder('Enter your username');
});

test('that select has correct id', function () {
    $this->select->id('user-id')->assertId('user-id');
});

test('that select has correct value', function () {
    $this->select->setValue('test-value')->assertValue('test-value');
});

test('that select has correct label', function () {
    $this->select->label('User Name')->assertLabel('User Name');
});

test('that select has correct help text', function () {
    $this->select->helpText('This is help text')->assertHelpText('This is help text');
});

test('that select has correct rules', function () {
    $this->select->rules(['required', 'email'])->assertRules(['required', 'email']);
});

test('that select has correct attributes', function () {
    $this->select->addAttribute('data-test', 'value')->assertAttributes(['data-test' => 'value']);
});

test('that select has a container', function () {
    $this->select->container(app(\Hynek\Form\Contracts\ControlContainer::class))
        ->assertContainer(\Hynek\Form\Contracts\ControlContainer::class);
});

test('that select is attached to a form', function () {
    $this->select->form(app(\Hynek\Form\Contracts\FormBuilder::class))
        ->assertForm(\Hynek\Form\Contracts\FormBuilder::class);
});

test('that select has options', function () {
    $options = [
        '1' => 'Option 1',
        '2' => [
            'text' => 'Option 2',
            'disabled' => true,
        ],
    ];
    $expected = [
        ['text' => 'Option 1', 'value' => '1', 'disabled' => false],
        ['text' => 'Option 2', 'value' => '2', 'disabled' => true],
    ];
    $this->select->option($options)->assertOptions($expected);
});

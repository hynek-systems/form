<?php

beforeEach(function () {
    $this->button = app('form.control.button');
});

test('that button can be created', function () {
    expect($this->button)->toBeInstanceOf(\Hynek\Form\Controls\Button::class);
});

test('that button can have text', function () {
    $this->button->text('Submit')->assertText('Submit');
});

test('that button can have icon', function () {
    $this->button->icon('check')->assertIcon([
        'name' => 'check',
        'trailing' => false,
        'variant' => 'micro',
    ]);
});

test('that button can have type', function () {
    $this->button->type('submit')->assertType('submit');
});

test('that buttons throws error on invalid type', function () {
    $this->expectException(\InvalidArgumentException::class);
    $this->button->type('invalid-type');
});

test('that button can have variant', function () {
    $this->button->variant('primary')->assertVariant('primary');
});

test('that button can have size', function () {
    $this->button->size('sm')->assertSize('sm');
});

test('that button throws error on invalid size', function () {
    $this->expectException(\InvalidArgumentException::class);
    $this->button->size('invalid-size');
});

test('that button can have tooltip', function () {
    $this->button->tooltip('This is a tooltip')->assertTooltip([
        'text' => 'This is a tooltip',
        'position' => 'top',
        'kbd' => null,
    ]);
});

test('that button can have attributes', function () {
    $this->button->addAttribute('id', 'submit-button')->assertAttributes(['id' => 'submit-button']);
});

test('that button can have loading state', function () {
    $this->button->loading(true)->assertLoading(true);
});

test('that button can have keyboard shortcut', function () {
    $this->button->kbd('ctrl+s')->assertKbd('ctrl+s');
});

test('that button has text', function () {
    $this->button->text('Click me')->assertText('Click me');
});

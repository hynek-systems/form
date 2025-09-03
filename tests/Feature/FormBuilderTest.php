<?php

beforeEach(function () {
    $this->formBuilder = app(config('form.default_form_builder'));
});

test('that form builder can be created', function () {
    expect($this->formBuilder)->toBeInstanceOf(\Hynek\Form\Contracts\FormBuilder::class);
});

test('that form builder can have attributes', function () {
    $this->formBuilder->addAttribute('id', 'my-form')->assertAttributes(['id' => 'my-form']);
});

test('that form builder can be assigned an ID', function () {
    $this->formBuilder->id('my-form')->assertId('my-form');
});

test('that form builder can be assigned a wire:submit directive', function () {
    $this->formBuilder->livewireSubmit('action')->assertLivewireSubmit('action');
});

test('that form builder can have name', function () {
    $this->formBuilder->name('my-form')->assertName('my-form');
});

test('that form builder can manage buttons', function () {
    $this->formBuilder
        ->button('Submit', 'submit')
        ->button('Reset', 'reset')
        ->button('Do something', 'button');

    expect($this->formBuilder->getButtons())
        ->toBeInstanceOf(\Hynek\Form\Contracts\ButtonsCollection::class)
        ->and($this->formBuilder->getButtons()->count())->toBe(3);
});

test('that form builder can manage elements', function () {
    $this->formBuilder
        ->element(app('form.control.input', ['name' => 'input']))
        ->element(app('form.control.select', ['name' => 'select']))
        ->element(app('form.control.textarea', ['name' => 'textarea']));

    expect($this->formBuilder->getElements())
        ->toBeInstanceOf(\Hynek\Form\Contracts\ElementsCollection::class)
        ->and($this->formBuilder->getElements()->count())->toBe(3);
});

// TODO: Remove container from builder. From builder is a builder not an element
// test('that form builder can be assigned a container', function () {
//    $this->formBuilder->container(new \Hynek\Form\FormContainer)->assertContainer(\Hynek\Form\FormContainer::class);
// });

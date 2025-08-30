<?php

return [
    'form_class' => \Hynek\Form\Form::class,
    'default_form_container' => \Hynek\Form\FormContainer::class,
    'default_element_container' => \Hynek\Form\ElementContainer::class,
    'default_form_builder' => \Hynek\Form\FormBuilder::class,
    'default_label' => \Hynek\Form\Label::class,
    'default_help_text' => \Hynek\Form\HelpText::class,
    'default_error' => \Hynek\Form\Error::class,
    'elements_collection' => \Hynek\Form\ElementsCollection::class,
    'controls' => [
        'input' => \Hynek\Form\Controls\Input::class,
        'textarea' => \Hynek\Form\Controls\TextArea::class,
        'select' => \Hynek\Form\Controls\Select::class,
    ],
    'views' => [
        'form_container' => 'form::form-container',
        'element_container' => 'form::element-container',
        'input' => 'form::controls.input',
        'textarea' => 'form::controls.textarea',
        'select' => 'form::controls.select',
        'label' => 'form::label',
        'help_text' => 'form::help-text',
        'error' => 'form::error',
    ],
];

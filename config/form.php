<?php

return [
    /**
     *--------------------------------------------------------------------------
     * Form Class
     *--------------------------------------------------------------------------
     *
     * This setting specifies the fully qualified class name of the main Form
     * object used by the package. You can extend the default Form class
     * to add custom functionality and then update this configuration to use
     * your custom class.
     */
    'form_class' => \Hynek\Form\Form::class,

    /**
     *--------------------------------------------------------------------------
     * Default Form Container
     *--------------------------------------------------------------------------
     *
     * This defines the default class used to a form element.
     * Customize this if you want to use a different container class for your forms.
     */
    'default_form_container' => \Hynek\Form\FormContainer::class,

    /**
     *--------------------------------------------------------------------------
     * Default Control Container
     *--------------------------------------------------------------------------
     *
     * This setting specifies the default class used to wrap individual form controls
     * (e.g., input fields, textareas, selects). It often includes elements like
     * labels, help text, and error messages around the control.
     * Change this to use a custom control container class.
     */
    'default_control_container' => \Hynek\Form\ControlContainer::class,

    /**
     *--------------------------------------------------------------------------
     * Default Form Builder
     *--------------------------------------------------------------------------
     *
     * This configuration points to the default class responsible for building
     * and rendering forms. It's the core component that orchestrates the creation
     * of form elements and their containers.
     * You can replace this with your own form builder implementation.
     */
    'default_form_builder' => \Hynek\Form\FormBuilder::class,

    /**
     *--------------------------------------------------------------------------
     * Default Label Class
     *--------------------------------------------------------------------------
     *
     * This defines the default class used to render labels for form controls.
     * Customize this if you need to extend or replace the default label functionality.
     */
    'default_label' => \Hynek\Form\Label::class,

    /**
     *--------------------------------------------------------------------------
     * Default Help Text Class
     *--------------------------------------------------------------------------
     *
     * This setting specifies the default class used to render help text (small,
     * descriptive text) associated with form controls.
     * Update this if you have a custom help text implementation.
     */
    'default_help_text' => \Hynek\Form\HelpText::class,

    /**
     *--------------------------------------------------------------------------
     * Default Error Class
     *--------------------------------------------------------------------------
     *
     * This defines the default class used to render validation error messages
     * for form controls.
     * Change this if you want to use a different class for displaying errors.
     */
    'default_error' => \Hynek\Form\Error::class,

    /**
     *--------------------------------------------------------------------------
     * Elements Collection Class
     *--------------------------------------------------------------------------
     *
     * This configuration specifies the class that represents a collection
     * of form elements (controls, containers, etc.). It's used internally
     * to manage and iterate over groups of form components.
     */
    'elements_collection' => \Hynek\Form\ElementsCollection::class,

    /**
     *--------------------------------------------------------------------------
     * Controls Mapping
     *--------------------------------------------------------------------------
     *
     * This array maps string keys (e.g., 'input', 'textarea') to their
     * corresponding fully qualified class names for different form controls.
     * This allows the package to dynamically create instances of these control
     * classes based on the type requested.
     * You can extend this array to add custom control types or override
     * existing ones with your own implementations.
     */
    'controls' => [
        'input' => \Hynek\Form\Controls\Input::class,
        'textarea' => \Hynek\Form\Controls\TextArea::class,
        'select' => \Hynek\Form\Controls\Select::class,
        'checkbox' => \Hynek\Form\Controls\Checkbox::class,
        'checkbox-group' => \Hynek\Form\Controls\CheckboxGroup::class,
        'radio' => \Hynek\Form\Controls\Radio::class,
        'radio-group' => \Hynek\Form\Controls\RadioGroup::class,
        'button' => \Hynek\Form\Controls\Button::class,
    ],

    /**
     *--------------------------------------------------------------------------
     * View Paths
     *--------------------------------------------------------------------------
     *
     * This array defines the Blade view paths used by the package for rendering
     * various form components. These views are typically located within the
     * `resources/views` directory of the package (or your application if
     * you've published them).
     * You can override these paths to point to your own custom Blade templates.
     * The `form::` prefix indicates views from the `hynek-form` package namespace.
     */
    'views' => [
        'form' => 'form::form',
        'form_container' => 'form::form-container',
        'control_container' => 'form::control-container',
        'input' => 'form::controls.input',
        'textarea' => 'form::controls.textarea',
        'select' => 'form::controls.select',
        'checkbox' => 'form::controls.checkbox',
        'checkbox-group' => 'form::controls.checkbox.group',
        'radio' => 'form::controls.radio',
        'radio-group' => 'form::controls.radio.group',
        'button' => 'form::controls.button',
        'label' => 'form::label',
        'help_text' => 'form::help-text',
        'error' => 'form::error',
    ],

    /*
    |--------------------------------------------------------------------------
    | Auto Register Forms
    |--------------------------------------------------------------------------
    |
    | Add directories here that should be scanned for form classes.
    | Both application and package developers can add to this array.
    |
    */
    'auto_register_forms' => [
        app_path('Forms'),
    ],
];

# Laravel Form Package

This package provides a robust and flexible way to build and render forms in your Laravel applications. It offers a clear, object-oriented approach to defining your form structures, controls, and presentation.

## Installation

You can install the package via Composer:

```bash
composer require hynek/form
```

After installing, publish the package's configuration file and views (optional) using:

```bash
php artisan vendor:publish --provider="Hynek\Form\FormServiceProvider"
```

This will publish `config/form.php` and `resources/views/vendor/form` to your application.

## Configuration

The package's configuration file, `config/form.php`, allows you to customize the default classes and views used for various form components.

Here's a breakdown of the available configuration options:

```php
// config/form.php
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
];

```

## Usage

The core of this package revolves around the `FormBuilder` interface, which defines the methods for constructing your forms. You will typically interact with an implementation of this interface to define your forms.

### Basic Form Creation

To create a new form, you would usually instantiate the `FormBuilder` (or its concrete implementation) and chain its methods.

```php
use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Controls\Input;
use Hynek\Form\Controls\Textarea;
use Hynek\Form\Controls\Button;

// Assuming you've resolved the FormBuilder from the service container
// e.g., via dependency injection or app()->make()
$form = app(FormBuilder::class)
    ->action(route('posts.store'))
    ->method('POST')
    ->element(
        (new Input('title'))
            ->id('post-title')
            ->label('Post Title')
            ->placeholder('Enter post title')
            ->required()
    )
    ->element(
        (new Textarea('content'))
            ->id('post-content')
            ->label('Post Content')
            ->placeholder('Write your post content here')
            ->rows(5)
    )
    ->button('Submit', 'submit'); // Creates a submit button

// To render the form in your Blade view:
// echo $form->render(); or simply use {{ $form }}
```

### FormBuilder Methods

The `FormBuilder` interface provides the following methods for building your forms:

#### `addAttribute(string|array $name, ?string $value = null): static`
Adds HTML attributes to the form element.
- `$name`: The attribute name (string) or an associative array of attributes.
- `$value`: The attribute value (if `$name` is a string).

```php
$form->addAttribute('class', 'my-custom-form');
$form->addAttribute(['data-foo' => 'bar', 'aria-label' => 'Contact Form']);
```

#### `removeAttribute(string $name): static`
Removes an HTML attribute from the form element.
- `$name`: The name of the attribute to remove.

```php
$form->removeAttribute('method');
```

#### `container(ElementContainer $container): static`
Sets the container for the element. This allows you to wrap your form elements in custom HTML structures.
- `$container`: An instance of `ElementContainer`.

#### `name(string $name): static`
Sets the name of the form element. (Useful for the form itself if it's treated as an element).
- `$name`: The name string.

```php
$form->name('myForm');
```

#### `id(string $id): static`
Sets the HTML `id` attribute of the form element.
- `$id`: The ID string.

```php
$form->id('my-form-id');
```

#### `view(string $view): static`
Sets a custom Blade view for rendering the element.
- `$view`: The Blade view path (e.g., `'custom.form.template'`).

```php
$form->view('my-theme.forms.standard');
```

#### `getName(): ?string`
Gets the name of the form element.

#### `getContainer(): ?ElementContainer`
Gets the container of the form element.

#### `action(string $action): static`
Sets the `action` attribute for the form.
- `$action`: The URL where the form data will be submitted.

```php
$form->action(route('users.store'));
```

#### `method(string $method): static`
Sets the `method` attribute for the form (e.g., `POST`, `GET`).
- `$method`: The HTTP method.

```php
$form->method('POST');
```

#### `element(FormElement $element): static`
Adds a form element (like an input, textarea, or select) to the form.
- `$element`: An instance of a class implementing `FormElement` (e.g., `Input`, `Textarea`).

```php
use Hynek\Form\Controls\Input;
use Hynek\Form\Controls\Select;

$form->element(new Input('username')->label('Username'))
     ->element(
         (new Select('role_id'))
             ->label('User Role')
             ->options(['1' => 'Admin', '2' => 'Editor'])
     );
```

#### `getElements(): ElementsCollection`
Retrieves a collection of all form elements added to the builder.

#### `getRules(): Collection`
Retrieves the validation rules associated with the form's elements. (Implementation dependent on how rules are attached to `FormElement` instances).

#### `button(string $text, ?string $type = 'button'): static`
Adds a button to the form.
- `$text`: The text displayed on the button.
- `$type`: The button type (e.g., `'submit'`, `'button'`, `'reset'`). Defaults to `'button'`.

```php
$form->button('Save Changes', 'submit')
     ->button('Cancel'); // Defaults to type="button"
```

#### `getButtons(): ButtonsCollection`
Retrieves a collection of all buttons added to the form.

#### `enableAjax(): static`
Enables AJAX/XHR submission for the form. This would typically add a specific attribute or class that your JavaScript can hook into.

```php
$form->enableAjax();
```

#### `disableAjax(): static`
Disables AJAX/XHR submission for the form.

```php
$form->disableAjax();
```

#### `livewireSubmit(string $livewireSubmit): static`
Integrates with Livewire by setting a `wire:submit` attribute on the form.
- `$livewireSubmit`: The Livewire method to call on form submission (e.g., `'saveUser'`).

```php
$form->livewireSubmit('savePost');
```

#### `updateValue($elementName, $value): static`
Updates the value of a specific form element.
- `$elementName`: The name of the element whose value is to be updated.
- `$value`: The new value for the element.

```php
// After fetching existing data
$form->updateValue('title', $existingPost->title);
```

### Rendering Forms

Once you've constructed your form using the `FormBuilder`, you can render it in your Blade templates:

```blade
<!-- resources/views/posts/create.blade.php -->
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Create New Post
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                {{ $postForm }} {{-- Assuming $postForm is passed from your controller --}}
            </div>
        </div>
    </div>
</x-app-layout>
```

In your controller, you would pass the constructed form to the view:

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Controls\Input;
use Hynek\Form\Controls\Textarea;
use Hynek\Form\Controls\Button;

class PostController extends Controller
{
    public function create(FormBuilder $formBuilder)
    {
        $postForm = $formBuilder
            ->action(route('posts.store'))
            ->method('POST')
            ->element(
                (new Input('title'))
                    ->label('Post Title')
                    ->placeholder('Enter post title')
                    ->required()
            )
            ->element(
                (new Textarea('content'))
                    ->label('Post Content')
                    ->placeholder('Write your post content here')
                    ->rows(5)
            )
            ->button('Create Post', 'submit');

        return view('posts.create', compact('postForm'));
    }
}
```

## Extending and Customizing

### Custom Form Controls

You can create your own custom form controls by extending the `Hynek\Form\Controls\Control` class (or any existing control) and implementing the necessary methods. Once created, you can register your custom control in the `config/form.php` file under the `controls` array.

```php
// app/Forms/Controls/MyCustomControl.php
namespace App\Forms\Controls;

use Hynek\Form\Controls\FormControl;
use Hynek\Form\Traits\Renderable;

class MyCustomControl extends FormControl
{
    use Renderable;
    
    public function toArray()
    {
        return [];
    }
}
```

Then, in `config/form.php`:

```php
// ...
'controls' => [
    // ... existing controls
    'my-custom-control' => \App\Forms\Controls\MyCustomControl::class,
],
'views' => [
    // ... existing views
    'my-custom-control' => 'my-theme.controls.custom',
],
// ...
```

### Custom Views

If you've published the package's views, you can directly modify them in `resources/views/vendor/form`. Alternatively, you can create entirely new views and update the `views` array in `config/form.php` to point to your custom templates.

### Custom Containers

Similar to controls, you can extend `Hynek\Form\FormContainer` or `Hynek\Form\ControlContainer` to create custom wrappers for your forms or individual controls. Then, update the `default_form_container` or `default_control_container` in your `config/form.php`.
## 3rd-party libraries
### PHP / Laravel
- livewire/flux
### JavaScript
- Vite

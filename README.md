# Hynek Form Package

[![Latest Version on Packagist](https://img.shields.io/packagist/v/hynek/hynek-form.svg?style=flat-square)](https://packagist.org/packages/hynek/hynek-form)
[![GitHub Tests Action Status](https://img.shields.io/github/workflow/status/henyk/hynek-form/run-tests?label=tests)](https://github.com/henyk/hynek-form/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/workflow/status/henyk/hynek-form/Check%20&%20fix%20styling?label=code%20style)](https://github.com/henyk/hynek-form/actions?query=workflow%3A"Check+%26+fix+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/hynek/hynek-form.svg?style=flat-square)](https://packagist.org/packages/hynek/hynek-form)

**Hynek Form** is a modern, feature-rich Laravel package for building dynamic, interactive forms with built-in support for **HTMX**, **Livewire**, **Spatie Laravel Data**, and seamless **validation**. Create beautiful, type-safe forms with minimal boilerplate code.

## ✨ Key Features

- 🎯 **Declarative Form Classes** - Define forms as PHP classes with clear, intuitive syntax
- ⚡ **HTMX Integration** - Built-in support for partial form updates and real-time validation
- 🔄 **Livewire Compatible** - Seamless integration with Livewire components
- 📝 **Spatie Laravel Data** - Type-safe form handling with automatic validation
- 🎨 **Customizable Views** - Fully customizable Blade templates with sensible defaults
- 🛡️ **Enhanced Form Requests** - Extended Laravel Form Requests with HTMX support
- 🏗️ **Extensible Architecture** - Easy to extend with custom controls and containers
- 📱 **Responsive Design** - Mobile-first approach with modern UI patterns

## 🚀 Installation

Install the package via Composer:

```bash
composer require hynek/hynek-form
```

Publish the configuration file and views (optional):

```bash
php artisan vendor:publish --provider="Hynek\Form\FormServiceProvider"
```

This publishes:
- `config/form.php` - Configuration file
- `resources/views/vendor/form/` - Blade templates

## 🎯 Quick Start

### 1. Generate a Form Class

```bash
php artisan make:form ContactForm
```

### 2. Define Your Form

```php path=/app/Forms/ContactForm.php start=1
<?php

namespace App\Forms;

use Hynek\Form\Enums\FormMethods;
use Hynek\Form\Form;

class ContactForm extends Form
{
    public function fields(): array
    {
        return [
            'name' => [
                'element' => 'input',
                'label' => 'Full Name',
                'placeholder' => 'Enter your full name',
                'rules' => ['required', 'string', 'max:255'],
            ],
            'email' => [
                'element' => 'input',
                'type' => 'email',
                'label' => 'Email Address', 
                'placeholder' => 'your@email.com',
                'rules' => ['required', 'email'],
            ],
            'message' => [
                'element' => 'textarea',
                'label' => 'Message',
                'placeholder' => 'Your message here...',
                'rows' => 4,
                'rules' => ['required', 'string'],
            ],
        ];
    }

    public function buttons(): array
    {
        return [
            ['text' => 'Send Message', 'type' => 'submit'],
            ['text' => 'Reset', 'type' => 'reset'],
        ];
    }

    public function title(): ?string
    {
        return 'Contact Us';
    }

    protected function bootForm(): void
    {
        $this->action(route('contact.store'))
            ->method(FormMethods::POST)
            ->addAttribute('class', 'space-y-6');
    }
}
```

### 3. Use in Controller

```php path=/app/Http/Controllers/ContactController.php start=1
<?php

namespace App\Http\Controllers;

use App\Forms\ContactForm;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function create()
    {
        $form = new ContactForm();
        
        return view('contact.create', compact('form'));
    }
    
    public function store(Request $request)
    {
        $form = new ContactForm();
        $validatedData = $form->validate();
        
        // Process the form data...
        
        return redirect()->back()->with('success', 'Message sent!');
    }
}
```

### 4. Render in Blade

```blade path=/resources/views/contact/create.blade.php start=1
@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto py-8">
    {{ $form }}
</div>
@endsection
```

## 🔥 Advanced Features

### HTMX Integration

Enable HTMX for real-time form validation and partial updates:

```php path=null start=null
class ContactForm extends Form
{
    public function useHtmx(): bool
    {
        return true;
    }
    
    protected function bootForm(): void
    {
        $this->action(route('contact.store'))
            ->method(FormMethods::POST);
    }
}
```

### Enhanced Form Requests

Use the enhanced `FormRequest` class for automatic HTMX validation responses:

```php path=/app/Http/Requests/ContactRequest.php start=1
<?php

namespace App\Http\Requests;

use App\Forms\ContactForm;
use Hynek\Form\FormRequest;

class ContactRequest extends FormRequest
{
    protected ContactForm $form;
    
    public function __construct()
    {
        parent::__construct();
        $this->form = new ContactForm();
    }
    
    public function rules()
    {
        return $this->form->getBuilder()->getRules()->toArray();
    }
    
    public function authorize()
    {
        return true;
    }
}
```

### Livewire Integration

Create reactive forms with Livewire:

```php path=/app/Livewire/ContactForm.php start=1
<?php

namespace App\Livewire;

use Hynek\Form\Livewire\Form;

class ContactForm extends Form
{
    public function fields(): array
    {
        return [
            'name' => [
                'element' => 'input',
                'label' => 'Name',
                'rules' => ['required'],
            ],
            'email' => [
                'element' => 'input',
                'type' => 'email', 
                'label' => 'Email',
                'rules' => ['required', 'email'],
            ],
        ];
    }
    
    public function submit()
    {
        $this->validate();
        
        // Process form...
        
        session()->flash('message', 'Form submitted successfully!');
    }
}
```

### Spatie Laravel Data Integration

Create type-safe forms with automatic validation:

```php path=/app/Data/ContactData.php start=1
<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Email;

class ContactData extends Data
{
    public function __construct(
        #[Required]
        public string $name,
        
        #[Required, Email]
        public string $email,
        
        #[Required] 
        public string $message,
    ) {}
}
```

```php path=/app/Forms/ContactForm.php start=35
use App\Data\ContactData;
use Spatie\LaravelData\Data;

class ContactForm extends Form
{
    public static function fromData(Data $data): static
    {
        return parent::fromData($data);
    }
    
    public function toData(): ContactData
    {
        $values = $this->getBuilder()->getElements()->getFormValues();
        return ContactData::from($values);
    }
}
```

### Model Binding

Prefill forms from Eloquent models:

```php path=null start=null
use App\Models\User;

public function edit(User $user)
{
    $form = ContactForm::fromModel($user);
    
    return view('contact.edit', compact('form'));
}
```

## 🎨 Available Form Controls

### Input Types
```php path=null start=null
'email' => [
    'element' => 'input',
    'type' => 'email',
    'label' => 'Email',
    'placeholder' => 'Enter email',
    'rules' => ['required', 'email'],
],

'password' => [
    'element' => 'input', 
    'type' => 'password',
    'label' => 'Password',
],

'number' => [
    'element' => 'input',
    'type' => 'number',
    'label' => 'Age',
    'min' => 18,
    'max' => 100,
],
```

### Select & Options
```php path=null start=null
'country' => [
    'element' => 'select',
    'label' => 'Country',
    'options' => [
        'us' => 'United States',
        'ca' => 'Canada', 
        'uk' => 'United Kingdom',
    ],
    'placeholder' => 'Choose country...',
],
```

### Checkboxes & Radio
```php path=null start=null
'newsletter' => [
    'element' => 'checkbox',
    'label' => 'Subscribe to newsletter',
    'value' => true,
],

'plan' => [
    'element' => 'radio-group',
    'label' => 'Choose Plan',
    'options' => [
        'basic' => 'Basic ($9/mo)',
        'pro' => 'Professional ($19/mo)',
        'enterprise' => 'Enterprise ($39/mo)',
    ],
],
```

### Textarea
```php path=null start=null
'description' => [
    'element' => 'textarea',
    'label' => 'Description',
    'rows' => 6,
    'placeholder' => 'Describe your needs...',
],
```

## 🛠️ Configuration

Customize the package behavior in `config/form.php`:

```php path=/config/form.php start=1
<?php

return [
    // Default form builder class
    'default_form_builder' => \Hynek\Form\FormBuilder::class,
    
    // Control mappings
    'controls' => [
        'input' => \Hynek\Form\Controls\Input::class,
        'textarea' => \Hynek\Form\Controls\TextArea::class,
        'select' => \Hynek\Form\Controls\Select::class,
        'checkbox' => \Hynek\Form\Controls\Checkbox::class,
        'radio' => \Hynek\Form\Controls\Radio::class,
        'button' => \Hynek\Form\Controls\Button::class,
        // Add custom controls here
    ],
    
    // View paths
    'views' => [
        'form' => 'form::form',
        'input' => 'form::controls.input',
        'textarea' => 'form::controls.textarea',
        // Customize view paths
    ],
];
```

## 🔧 Custom Controls

Create custom form controls:

```php path=/app/Forms/Controls/DatePicker.php start=1
<?php

namespace App\Forms\Controls;

use Hynek\Form\Controls\FormControl;

class DatePicker extends FormControl
{
    protected string $format = 'Y-m-d';
    
    public function format(string $format): static
    {
        $this->format = $format;
        return $this;
    }
    
    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'format' => $this->format,
        ]);
    }
}
```

Register in configuration:

```php path=null start=null
// config/form.php
'controls' => [
    // ... existing controls
    'date-picker' => \App\Forms\Controls\DatePicker::class,
],
'views' => [
    // ... existing views  
    'date-picker' => 'forms.controls.date-picker',
],
```

## 🧪 Testing

Run the test suite:

```bash
composer test
```

Run with coverage:

```bash
composer test-coverage
```

## 📖 Documentation

For detailed documentation and examples, visit our [documentation site](https://hynek-form.docs) (coming soon).

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🛡️ Security

If you discover any security-related issues, please email security@hynek.dev instead of using the issue tracker.

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## 💫 Credits

- [Henrik Söderlind](https://github.com/henriksoderlind)
- [All Contributors](../../contributors)

## 🌟 Built With

- **[Laravel](https://laravel.com)** - The PHP Framework for Web Artisans
- **[Livewire](https://laravel-livewire.com)** - A full-stack framework for Laravel
- **[HTMX](https://htmx.org)** - High power tools for HTML
- **[Spatie Laravel Data](https://spatie.be/docs/laravel-data)** - Powerful data objects for Laravel
- **[Pest](https://pestphp.com)** - An elegant PHP testing framework

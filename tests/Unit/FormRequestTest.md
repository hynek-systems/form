# FormRequest Test Documentation

## Overview
This test suite covers the `Hynek\Form\FormRequest` class, which extends Laravel's `FormRequest` to provide enhanced functionality for HTMX-enabled forms.

## Test Coverage

### 1. Inheritance Test
- **Test**: `form request extends laravel form request`
- **Purpose**: Ensures the FormRequest properly extends Laravel's base FormRequest class
- **Validates**: Class inheritance and basic instantiation

### 2. HTMX Request Handling
- **Test**: `failed validation throws http response exception for htmx requests`
- **Purpose**: Tests that validation failures in HTMX requests throw `HttpResponseException` with form fragment content
- **Validates**: 
  - HTMX request detection via `HtmxRequest::isHtmxRequest()`
  - Form fragment rendering with errors and old input data
  - Proper exception type being thrown

### 3. Non-HTMX Request Handling  
- **Test**: `failed validation calls parent method for non-htmx requests`
- **Purpose**: Ensures that regular (non-HTMX) requests fall back to Laravel's default validation behavior
- **Validates**:
  - Proper delegation to parent `failedValidation` method
  - Standard Laravel form request behavior for regular requests

### 4. Response Content Validation
- **Test**: `failed validation for htmx request returns correct response content`
- **Purpose**: Verifies that HTMX validation responses contain the correct HTML content and status code
- **Validates**:
  - Response content matches form fragment output
  - HTTP status code is 200 (success with validation errors)
  - Response structure for HTMX consumption

### 5. Data Passing to Form Fragment
- **Test**: `form request passes form data to renderFragment correctly`
- **Purpose**: Ensures that validation errors and form data are correctly passed to the form's `renderFragment` method
- **Validates**:
  - Proper data structure passed to `renderFragment`
  - Error messages from validator
  - Old input data from request

### 6. Form Property Management
- **Test**: `form request can be instantiated with form property`
- **Purpose**: Tests that the protected `$form` property can be set and accessed
- **Validates**:
  - Form instance assignment
  - Property accessibility via reflection

## Key Features Tested

### HTMX Integration
The FormRequest class provides seamless integration with HTMX by:
- Detecting HTMX requests automatically
- Returning HTML fragments instead of JSON responses for validation errors
- Maintaining form state with errors and old input data

### Laravel Compatibility
- Maintains full compatibility with standard Laravel form requests
- Properly delegates to parent methods for non-HTMX requests
- Preserves existing validation behavior

### Form Fragment Rendering
- Utilizes the form's `renderFragment` method for partial updates
- Passes validation errors and old input data to maintain form state
- Returns proper HTML content for HTMX consumption

## Dependencies
- `Mauricius\LaravelHtmx\Http\HtmxRequest` for HTMX detection
- `Hynek\Form\Contracts\Form` for form fragment rendering
- `Illuminate\Http\Exceptions\HttpResponseException` for custom response handling
- Mockery for comprehensive mocking in tests

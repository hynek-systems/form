@props([
    '_attributes' => collect(),
    'text' => '',
    'htmlFor' => null,
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'for' => $htmlFor,
    ]);
@endphp
<flux:label {{ $attributes }}>{{ $text }}</flux:label>

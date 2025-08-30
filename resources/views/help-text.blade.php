@props([
    '_attributes' => collect(),
    'text' => null
])
@php
    $attributes = $attributes->merge($_attributes)
@endphp
<flux:description {{ $attributes }}>{{ $text }}</flux:description>

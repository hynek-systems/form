@props([
    '_attributes' => collect(),
    'name' => null,
    'text' => null
])
@php
    $attributes = $attributes->merge($_attributes);
@endphp
<flux:error :$name :message="$text" {{ $attributes }} />

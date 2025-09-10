@props([
    '_attributes' => collect(),
    'icon' => null,
    'kbd' => null,
    'loading' => false,
    'size' => null,
    'text' => null,
    'tooltip' => null,
    'type' => 'button',
    'variant' => 'outlined',
    'sqaure' => false,
    'inset' => null,
])
@php
    $attributes = $attributes->merge($_attributes);
@endphp
<flux:button
    :icon="$icon['name'] ?? null"
    :icon:variant="$icon['variant'] ?? null"
    :icon:trailing="$icon['trailing'] ?? null"
    :$kbd
    :$loading
    :$size
    :tooltip="$tooltip['text'] ?? null"
    :tooltip:position="$tooltip['position'] ?? null"
    :tooltip:kbd="$tooltip['kbd'] ?? null"
    :$type
    :$variant
    :$square
    :$inset
>
    {{ $text }}
</flux:button>

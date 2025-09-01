@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'error' => null,
    'helpText' => null,
    'value' => null,
    'livewireModel' => null,
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'data-name' => $name,
    ]);
@endphp
<flux:checkbox :$id :$name :$attributes @checked($value) @if (!blank($livewireModel)) wire:model="{{ $attributes }}"@endif />
<?php
if (!is_null($label)) {
    $label->render();
}

if (!is_null($helpText)) {
    $helpText->render();
}

if (!is_null($error)) {
    $error->render();
}
?>

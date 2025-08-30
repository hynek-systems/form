@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'value' => null,
    'placeholder' => null,
    'error' => null,
    'type' => 'text',
    'helpText' => null,
    'livewireModel' => null,
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'data-name' => $name,
    ]);
@endphp
<?php
if (!is_null($label)) {
  $label->render();
}
?>
<flux:input :$id :$attributes :$name :$type :$placeholder @if (!blank($livewireModel)) wire:model="$livewireModel"@endif />
<?php
if (!is_null($helpText)) {
  $helpText->render();
}
if (!is_null($error)) {
  $error->render();
}
?>

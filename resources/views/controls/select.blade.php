@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'options' => collect(),
    'placeholder' => null,
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
<?php
if (!is_null($label)) {
    $label->render();
}
?>
<flux:select :$id :$name :$placeholder :$attributes @if (!blank($livewireModel)) wire:model="{{ $attributes }}"@endif>
    @foreach($options as $option)
        <flux:select.option @selected($valur === $option['value']) :value="$option['value']" :disabled="$option['disabled'] ?? false">
            {{ $option['text'] }}
        </flux:select.option>
    @endforeach
</flux:select>
<?php
if (!is_null($helpText)) {
    $helpText->render();
}

if (!is_null($error)) {
    $error->render();
}
?>

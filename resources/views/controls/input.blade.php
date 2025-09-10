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

    if (!blank($livewireModel)) {
        $attributes = $_attributes->merge(['wire:model' => $livewireModel]);
    }
@endphp
<div class="space-y-6">
    @php
    if (!is_null($label)) {
        echo $label->render();
    }
    @endphp
    <flux:input :$id :$attributes :$name :$type :$placeholder />
    @php
    if (!is_null($helpText)) {
      echo $helpText->render();
    }
    if (!is_null($error)) {
      echo $error->render();
    }
    @endphp
</div>

@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'value' => null,
    'placeholder' => null,
    'error' => null,
    'helpText' => null,
    'livewireModel' => null,
    'rows' => 4,
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

    <flux:textarea :$id :$name :$placeholder :$rows :$attributes :$value />
    
    @php
        if (!is_null($helpText)) {
          echo $helpText->render();
        }
        if (!is_null($error)) {
          echo $error->render();
        }
    @endphp
</div>

@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'value' => null,
    'placeholder' => null,
    'prefix' => null,
    'error' => null,
    'suffix' => null,
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

    <flux:input.group>
        @if(!is_null($prefix))
            <flux:input.group.prefix>{{ $prefix }}</flux:input.group.prefix>
        @endif
        <flux:input :$id :$attributes :$name :$type :$placeholder />
        @if(!is_null($suffix))
            <flux:input.group.suffix>{{ $suffix }}</flux:input.group.suffix>
        @endif
    </flux:input.group>

    @php
    if (!is_null($helpText)) {
      echo $helpText->render();
    }
    if (!is_null($error)) {
      echo $error->render();
    }
    @endphp
</div>

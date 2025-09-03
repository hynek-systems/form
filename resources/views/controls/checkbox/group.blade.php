@props([
    '_attributes' => collect(),
    'id' => null,
    'livewireModel' => null,
    'label' => null,
    'check_all' => false,
    'checkboxes' => collect()
])
@php
    $attributes = $attributes->merge($_attributes)
@endphp
<flux:checkbox.group @if(!blank($livewireModel)) wire:model="{{ $livewireModel }}" @endif :label="$label && !$check_all ? $label->toArray()['text'] : null" :$attributes>
    @if($check_all)
        <flux:checkbox.all :$label />
    @endif
    @if(!blank($helpText))
        {!! $helpText->render() !!}
    @endif
        {!! $checkbox->render() !!}
</flux:checkbox.group>

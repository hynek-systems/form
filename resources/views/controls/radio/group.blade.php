@props([
    '_attributes' => null,
    'error' => null,
    'helpText' => null,
    'id' => null,
    'label' => null,
    'livewireModel' => null,
    'radios' => null,
])
@php
    $attributes = $attributes->merge($_attributes)
@endphp
<flux:radio.group @if(!blank($livewireModel)) wire:model="{{ $livewireModel }}" @endif :label="$label && !$check_all ? $label->toArray()['text'] : null" :$attributes>
    @if(!blank($helpText))
        {!! $helpText->render() !!}
    @endif
    {!! $radios->render() !!}
</flux:radio.group>

@props([
    '_attributes' => collect(),
    'action' => null,
    'buttons' => null,
    'elements' => null,
    'id' => null,
    'livewireSubmit' => null,
    'method' => null,
    'name' => null,
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'id' => $id,
        'name' => $name
    ])
@endphp
<form @if(!blank($livewireSubmit)) wire:submit="{{$livewireSubmit}}" @else :method="$method" :action="$action" @endif :name="$name" {{ $attributes }}>
    @csrf
    {!! $elements->render() !!}
    {!! $buttons->render() !!}
</form>

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
        'name' => $name,
    ])->class('space-y-6');
    $usesHtmx = $attributes->has('hx-post') || $attributes->has('hx-get') || $attributes->has('hx-put') || $attributes->has('hx-patch') || $attributes->has('hx-delete');
@endphp
<x-dynamic-component :component="\Hynek\Core\View\Layouts::DEFAULT_ADMIN_LAYOUT->value">
    <form @if(!blank($livewireSubmit)) wire:submit="{{$livewireSubmit}}" @elseif(!$usesHtmx) method="{{ $method }}" action="{{ $action }}" @endif {{ $attributes }}>
        @csrf
        {!! $elements->render() !!}
        {!! $buttons->render() !!}
    </form>
</x-dynamic-component>

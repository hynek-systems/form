@props([
    '_attributes' => collect(),
    'action' => null,
    'buttons' => null,
    'elements' => null,
    'id' => null,
    'livewireSubmit' => null,
    'method' => null,
    'name' => null,
    'title' => null,
    'layout' => null,
    'controls_layout' => 'grid'
])
@php
    $classes = Flux::classes('grid gap-6')
        ->add(match ($controls_layout) {
            'grid' => 'grid-cols-1 md:grid-cols-2',
            default => 'grid-cols-1'
        });
    $attributes = $attributes->merge([
        ...$_attributes,
        'id' => $id,
        'name' => $name,
    ])->class($classes);
    $usesHtmx = $attributes->has('hx-post') || $attributes->has('hx-get') || $attributes->has('hx-put') || $attributes->has('hx-patch') || $attributes->has('hx-delete');
@endphp
<x-dynamic-component :component="$layout ?? 'layouts.blank'">
    @if(!blank($title))
        <flux:heading level="1" size="xl" class="pb-4 mb-6 border-b border-solid border-zinc-700">{{ $title }}</flux:heading>
    @endif
    <form @if(!blank($livewireSubmit)) wire:submit="{{$livewireSubmit}}" @elseif(!$usesHtmx) method="{{ $method }}" action="{{ $action }}" @endif {{ $attributes }}>
        @csrf
        {!! $elements->render() !!}
        <div class="col-start-1 col-end-[-1]">
            {!! $buttons->render() !!}
        </div>
    </form>
</x-dynamic-component>

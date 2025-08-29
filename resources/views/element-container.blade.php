@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'element' => null,
])
@php
    $attributes = $attributes->merge([
        ...$_attributes->toArray(),
        'id' => $id,
        'data-name' => $name,
    ]);
@endphp
<flux:field {{$attributes}}>
    @if !blank($label)
        {!! $label->render() !!}
    @endif

    {!! $element->render() !!}
</flux:field>

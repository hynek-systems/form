@props([
    '_attributes' => collect(),
    'id' => null,
    'label' => null,
    'name' => null,
    'element' => null,
    'variant' => 'block',
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'id' => $id,
        'data-name' => $name,
    ]);
@endphp
<flux:field :$variant {{$attributes}}>
    @if(!blank($label))
        {!! $label->render() !!}
    @endif

    {!! $element->render() !!}
</flux:field>

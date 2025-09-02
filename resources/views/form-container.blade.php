@props([
    '_attributes' => collect(),
    'name' => null,
    'id' => null,
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'data-name' => $name,
        'id' => $id
    ])
@endphp
<div {{ $attributes }}>
    {!! $element->render() !!}
</div>

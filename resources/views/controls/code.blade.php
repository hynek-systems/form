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
    'lang' => 'html'
])
@php
    $attributes = $attributes->merge([
        ...$_attributes,
        'data-name' => $name,
    ]);
@endphp
<div class="space-y-6">
@php
    if (!is_null($label)) {
        echo $label->render();
    }
@endphp

    <div id="{{ $id }}"></div>
    <input type="hidden" name="{{ $name }}" value="{{ $value }}" data-editor-content />

    @php
        if (!is_null($helpText)) {
          echo $helpText->render();
        }
        if (!is_null($error)) {
          echo $error->render();
        }
    @endphp
</div>
<script>
    Hynek.CodeEditor(document.getElementById('{{ $id }}'), {
        content: @js($value),
        lang: @js($lang),
        autofocus: true
    })
</script>

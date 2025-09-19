@props([
    '_attributes' => collect(),
    'acceptedFileTypes' => [],
    'disabled' => false,
    'error' => null,
    'helpText' => null,
    'id' => null,
    'label' => null,
    'livewireModel' => null,
    'multiple' => false,
    'required' => false,
    'value' => [],
    'name' => null,
    'uploadUrl' => null,
    'revertUrl' => null,
    'restoreUrl' => null,
    'chunkUrl' => null,
    'loadUrl' => null,
    'allowDrop' => true,
    'allowBrowse' => true,
    'allowPaste' => true,
    'allowReplace' => true,
    'allowRevert' => true,
    'allowRemove' => true,
    'allowReorder' => false,
    'storeAsFile' => false,
    'forceRevert' => false,
    'maxFiles' => null,
    'maxParallelUploads' => 2,
    'checkValidity' => false,
    'dropOnPage' => false,
    'dropOnElement' => true,
    'dropValidation' => false,
    'instantUpload' => true,
    'chunkUploads' => false,
    'chunkSize' => 5000000,
    'chunkRetryDelays' => [500,1000,3000],
])
@php
    $attributes = $attributes->merge($_attributes);
@endphp
<?php
if (! is_null($label)) {
    echo $label->render();
}
?>
<input type="file" name="{{ $name }}" id="{{ $id }}" @if(! blank($livewireModel)) wire:model="{{ $livewireModel }}" @endif multiple="{{ $multiple }}" required="{{ $required }}" {{ $attributes }}/>
<?php
if (!is_null($helpText)) {
    echo $helpText->render();
}

if (!is_null($error)) {
    echo $error->render();
}
?>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        const input = document.querySelector('input[name="{{ $name }}"]');
        FilePond.create(input, {
            required: @js($required),
            disabled: @js($disabled),
            files: @js($value),
            allowDrop: @js($allowDrop),
            allowBrowse: @js($allowBrowse),
            allowPaste: @js($allowPaste),
            allowMultiple: @js($multiple),
            allowReplace: @js($allowReplace),
            allowRevert: @js($allowRevert),
            allowRemove: @js($allowRemove),
            allowReorder: @js($allowReorder),
            storeAsFile: @js($storeAsFile),
            forceRevert: @js($forceRevert),
            maxFiles: @js($maxFiles),
            maxParallelUploads: @js($maxParallelUploads),
            checkValidity: @js($checkValidity),
            dropOnPage: @js($dropOnPage),
            dropOnElement: @js($dropOnElement),
            dropValidation: @js($dropValidation),
            server: {
                process: @js($uploadUrl),
                revert: @js($revertUrl),
                load: @js($loadUrl),
                restore: @js($restoreUrl),
                patch: @js($chunkUrl),
                instantUpload: @js($instantUpload),
                chunkUploads: @js($chunkUploads),
                chunkSize: @js($chunkSize),
                chunkRetryDelays: @js($chunkRetryDelays),
            }
        })
    })
</script>


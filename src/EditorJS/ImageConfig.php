<?php

namespace Hynek\Form\EditorJS;

class ImageConfig extends Config
{
    public array $endpoints = [];

    public array $additionalRequestHeaders = [];

    public array $features = [];

    public function __construct(
        public string $field = 'image',
        public string $types = 'image/*',
        public ?array $additionalRequestData = [],
        ?array $additionalRequestHeaders = [],
        public ?string $captionPlaceholder = null,
        public ?string $buttonContent = null,
        ?array $features = []
    )
    {
        $this->endpoints = array_merge(
            [
                'byFile' => route('upload.store'),
                'byUrl' => route('upload.url'),
            ]
        );

        $this->additionalRequestHeaders = array_merge(
            ['X-CSRF-TOKEN' => csrf_token()],
            $additionalRequestHeaders
        );

        $this->features = array_merge(
            [
                'border' => true,
                'caption' => 'optional',
                'stretch' => true,
            ],
            $features
        );
    }
}

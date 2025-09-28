<?php

namespace Hynek\Form\EditorJS;

class LinkToolConfig extends Config
{
    public array $headers = [];

    public string $endpoint = '';

    public function __construct(?string $endpoint = null, ?array $headers = [])
    {
        $this->endpoint = $endpoint ?? route('link.retrieve');
        $this->headers = array_merge(['X-CSRF-TOKEN' => csrf_token()], $this->headers, $headers);
    }
}

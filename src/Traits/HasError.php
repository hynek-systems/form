<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\Error;

trait HasError
{
    protected Error $error;

    public function hookHasError()
    {
        $this->error = app(Error::class);
    }

    public function errorMessage(string $text, ?array $attributes = null): static
    {
        $this->error->text($text);

        if ($attributes) {
            $this->error->addAttribute($attributes);
        }

        return $this;
    }

    protected function withError(): array
    {
        return ['_error' => $this->error];
    }
}

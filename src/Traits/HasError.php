<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\Error;

trait HasError
{
    protected Error $error;

    public function bootHasError()
    {
        $this->error = app(Error::class);
    }

    public function errorMessage(string $text, ?array $attributes = null): static
    {
        $this->error->name($this->getName())->text($text);

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

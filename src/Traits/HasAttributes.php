<?php

namespace Hynek\Form\Traits;

trait HasAttributes
{
    protected $attributes;

    public function bootHasAttributes()
    {
        $this->attributes = collect();
    }

    public function addAttribute(string|array $name, ?string $value = null): static
    {
        if (is_array($name)) {
            foreach ($name as $key => $val) {
                $this->attributes->put($key, $val);
            }
        } else {
            $this->attributes->put($name, $value);
        }

        return $this;
    }

    public function removeAttribute(string $name): static
    {
        $this->attributes->forget($name);

        return $this;
    }

    protected function withAttributes(): array
    {
        return ['_attributes' => $this->attributes->toArray()];
    }
}

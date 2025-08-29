<?php

namespace Hynek\Form\Traits;

use Illuminate\Support\Collection;

trait HasOptions
{
    protected Collection $options;

    public function bootHasOptions()
    {
        $this->options = collect();
    }

    public function option(string|array|callable $text, array|string|null $value = null, ?bool $disabled = false): static
    {
        if (is_array($text)) {
            foreach ($text as $val => $option) {
                $this->options->push([
                    'text' => is_array($option) ? $option['text'] ?? '' : $option,
                    'value' => $val,
                    'disabled' => is_array($option) ? $option['disabled'] ?? false : false,
                ]);
            }
        } elseif (is_callable($text)) {
            $this->options->push(call_user_func($text));
        } else {
            $this->options->push([
                'text' => $text,
                'value' => $value,
                'disabled' => $disabled,
            ]);
        }

        return $this;
    }

    protected function withOptions()
    {
        return ['options' => $this->options];
    }
}

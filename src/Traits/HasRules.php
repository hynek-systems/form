<?php

namespace Hynek\Form\Traits;

use Illuminate\Support\Collection;

trait HasRules
{
    protected Collection $rules;

    public function bootHasRules()
    {
        $this->rules = collect([]);
    }

    public function rules(array $rules): static
    {
        $this->rules = $this->rules->merge($rules);

        return $this;
    }

    public function getRules(): Collection
    {
        return $this->rules;
    }
}

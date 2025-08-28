<?php

namespace Hynek\Form\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait HasLivewireModel
{
    protected string $model;

    public function bootHasLivewireModel()
    {
        if (Str::contains($this->name, '[')) {
            $this->model = Str::arraySyntaxToDot($this->name);
        } else {
            $this->model = $this->name;
        }
    }

    public function setLivewireModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    protected function withLivewireModel(): array
    {
        return ['livewireModel' => $this->model];
    }
}

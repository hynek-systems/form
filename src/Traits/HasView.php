<?php

namespace Hynek\Form\Traits;

trait HasView
{
    public static string $defaultView = '';

    protected string $view;

    public function bootHasView(): void
    {
        $this->view = static::$defaultView;
    }

    public function view(string $view): static
    {
        $this->view = $view;
        return $this;
    }

    protected function withView(): array
    {
        return ['view' => $this->view];
    }
}

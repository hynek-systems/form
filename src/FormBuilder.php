<?php

namespace Hynek\Form;

use Illuminate\Support\Collection;

class FormBuilder extends Base implements Contracts\FormBuilder
{
    use Traits\AjaxSubmission,
        Traits\HasAttributes,
        Traits\HasContainer,
        Traits\HasId,
        Traits\HasLivewireSubmit,
        Traits\HasName,
        Traits\HasView,
        Traits\ManagesButtons,
        Traits\ManagesElements;

    protected string $action;

    protected string $method;

    public static function make(string $name, string $action, ?string $method = null): static
    {
        $builder = (new static)
            ->name($name)
            ->id($name)
            ->action($action)
            ->container(app(FormContainer::class));

        if (! is_null($method)) {
            $builder->method($method);
        }

        return $builder;
    }

    /**
     * {@inheritDoc}
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withButtons(),
            ...$this->withElements(),
            ...$this->withId(),
            ...$this->withLivewireSubmit(),
            ...$this->withName(),
            ...$this->withView(),
            'action' => $this->action,
            'method' => $this->method,
        ];
    }

    public function action(string $action): static
    {
        $this->action = $action;

        return $this;
    }

    public function method(string $method): static
    {
        $this->method = strtoupper($method);

        return $this;
    }

    public function getRules(): Collection
    {
        return $this->elements->getRules();
    }
}

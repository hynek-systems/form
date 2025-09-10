<?php

namespace Hynek\Form;

use Illuminate\Support\Collection;

class FormBuilder extends Base implements Contracts\FormBuilder
{
    use Traits\AjaxSubmission,
        Traits\HasAttributes,
        /**
         * @deprecated
         */
        Traits\HasContainer,
        Traits\HasId,
        Traits\HasLivewireSubmit,
        Traits\HasName,
        /**
         * @deprecated
         */
        Traits\HasView,
        Traits\ManagesButtons,
        Traits\ManagesElements,
        Traits\Test\FormBuilderAssertions;

    protected string $action;

    protected string $method;

    protected ?string $title = null;

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
            'title' => $this->title,
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

    public function title(string $title): static
    {
        $this->title = $title;

        return $this;
    }
}

<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Contracts\Checkbox;
use Hynek\Form\Contracts\ElementsCollection;
use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasError;
use Hynek\Form\Traits\HasForm;
use Hynek\Form\Traits\HasHelpText;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasLabel;
use Hynek\Form\Traits\HasLivewireModel;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;

class CheckboxGroup extends Base implements \Hynek\Form\Contracts\CheckboxGroup
{
    use HasAttributes,
        HasError,
        HasForm,
        HasHelpText,
        HasId,
        HasLabel,
        HasLivewireModel,
        HasView,
        Renderable;

    protected \Hynek\Form\ElementsCollection $checkboxes;

    protected bool $checkAll = false;

    public function boot()
    {
        parent::boot();

        $this->checkboxes = new \Hynek\Form\ElementsCollection();
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withError(),
            ...$this->withHelpText(),
            ...$this->withId(),
            ...$this->withLabel(),
            ...$this->withLivewireModel(),
            ...$this->withView(),
            'checkboxes' => $this->checkboxes,
        ];
    }

    public function checkbox(Checkbox $checkbox): static
    {
        $checkbox->form($this->getForm());

        $this->checkboxes->addElement($checkbox);

        return $this;
    }

    public function removeCheckbox(string $name): static
    {
        $this->checkboxes->remove($name);

        return $this;
    }

    public function getCheckboxes(): ElementsCollection
    {
        return $this->checkboxes;
    }

    public function enableCheckAll(): static
    {
        $this->checkAll = true;

        return $this;
    }

    public function disableCheckAll(): static
    {
        $this->checkAll = false;

        return $this;
    }
}

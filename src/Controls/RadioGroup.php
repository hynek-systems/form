<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Contracts\ElementsCollection;
use Hynek\Form\Contracts\Radio;
use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasError;
use Hynek\Form\Traits\HasForm;
use Hynek\Form\Traits\HasHelpText;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasLabel;
use Hynek\Form\Traits\HasLivewireModel;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;

class RadioGroup extends Base implements \Hynek\Form\Contracts\RadioGroup
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

    protected \Hynek\Form\ElementsCollection $radios;

    public function boot()
    {
        parent::boot();

        $this->radios = new \Hynek\Form\ElementsCollection;
    }

    public function radio(Radio $radio): static
    {
        $radio->form($this->getForm());

        $this->radios->addElement($radio);

        return $this;
    }

    public function removeRadio(string $name): static
    {
        $this->radios->remove($name);

        return $this;
    }

    public function getRadios(): ElementsCollection
    {
        return $this->radios;
    }

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
            'radios' => $this->radios,
        ];
    }
}

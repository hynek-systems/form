<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Contracts\ElementContainer;
use Hynek\Form\Traits\Checkable;
use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasContainer;
use Hynek\Form\Traits\HasError;
use Hynek\Form\Traits\HasForm;
use Hynek\Form\Traits\HasHelpText;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasLabel;
use Hynek\Form\Traits\HasLivewireModel;
use Hynek\Form\Traits\HasName;
use Hynek\Form\Traits\HasRules;
use Hynek\Form\Traits\HasValue;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;

class Checkbox extends Base implements \Hynek\Form\Contracts\Checkbox
{
    use Checkable,
        HasAttributes,
        HasContainer,
        HasError,
        HasForm,
        HasHelpText,
        HasId,
        HasLabel,
        HasLivewireModel,
        HasName,
        HasRules,
        HasValue,
        HasView,
        Renderable {
            Checkable::getValue insteadof HasValue;
        }

    /**
     * {@inheritDoc}
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withChecked(),
            ...$this->withId(),
            ...$this->withLabel(),
            ...$this->withName(),
            ...$this->withError(),
            ...$this->withValue(),
            ...$this->withHelpText(),
            ...$this->withLivewireModel(),
            ...$this->withView(),
        ];
    }

    public function settingContainer(ElementContainer $container)
    {
        $container->variant('inline');
    }
}

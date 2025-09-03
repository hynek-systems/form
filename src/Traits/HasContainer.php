<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\ControlContainer;
use Hynek\Form\Contracts\ElementContainer;

trait HasContainer
{
    protected ElementContainer $container;

    public function bootHasContainer()
    {
        $this->container = app(ControlContainer::class);
    }

    public function container(ElementContainer $container): static
    {
        if (method_exists($this, 'settingCotainer')) {
            $this->settingContainer($container);
        }

        $this->container = $container->element($this);

        return $this;
    }

    public function getContainer(): ElementContainer
    {
        return $this->container;
    }
}

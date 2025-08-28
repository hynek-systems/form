<?php

namespace Hynek\Form\Traits;

use Hynek\Form\Contracts\ElementContainer;

trait HasContainer
{
    protected ElementContainer $container;

    public function bootHasContainer()
    {
        $this->container = app(ElementContainer::class);
    }

    public function container(ElementContainer $container): static
    {
        $this->container = $container->element($this);

        return $this;
    }

    public function getContainer(): ElementContainer
    {
        return $this->container;
    }
}

<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Contracts\ControlContainer;

abstract class FormControl extends Base implements \Hynek\Form\Contracts\FormControl
{
    public function __construct(string $name)
    {
        parent::__construct();
        $this->name($name);
        $this->container(app(ControlContainer::class));
    }
}

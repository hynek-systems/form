<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Contracts\ElementContainer;
use Hynek\Form\Contracts\FormBuilder;
use Illuminate\Support\Collection;

abstract class FormControl extends Base implements \Hynek\Form\Contracts\FormControl
{
    public function __construct(string $name)
    {
        parent::__construct();
        $this->name($name);
    }
}

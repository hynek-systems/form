<?php

namespace Hynek\Form;

class Base
{
    public function __construct()
    {
        $this->boot();
    }

    protected function bootTraits()
    {
        $class = static::class;

        foreach (class_uses_recursive($class) as $trait) {
            $method = 'boot'.class_basename($trait);

            if (method_exists($class, $method)) {
                $this->$method();
            }
        }
    }

    public function boot()
    {
        $this->bootTraits();
    }
}

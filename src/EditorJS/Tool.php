<?php

namespace Hynek\Form\EditorJS;

use Illuminate\Contracts\Support\Arrayable;

abstract class Tool implements Arrayable
{
    public ?Config $config = null;

    public string $key;

    public string $class;

    public function config(array $config): Config
    {
        $configClass = static::class.'Cofig';
        $this->config = app($configClass, $config);

        return $this->config;
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        $array = [];
        foreach (get_object_vars($this) as $key => $value) {
            if (is_null($value) || $key === 'key') {
                continue;
            }

            if (is_object($value) && method_exists($value, 'toArray')) {
                $array[$key] = $value->toArray();
            } else {
                $array[$key] = $value;
            }
        }

        return $array;
    }
}

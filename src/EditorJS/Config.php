<?php

namespace Hynek\Form\EditorJS;

use Illuminate\Contracts\Support\Arrayable;

abstract class Config implements Arrayable
{

    public function toArray()
    {
        $array = [];
        foreach (get_object_vars($this) as $key => $value) {
            if (is_null($value)) {
                continue;
            }

            $array[$key] = $value;
        }

        return $array;
    }
}

<?php

namespace Hynek\Form\Traits;

use Illuminate\Support\Str;

trait HasId
{
    protected static array $usedIds = [];

    protected string $id = '';

    public function bootHasId()
    {
        $this->id = Str::replace('.', '-', Str::arraySyntaxToDot($this->name ?? Str::random(8)));
    }

    public function id(string $id): static
    {
        if (in_array($id, self::$usedIds, true)) {
            throw new \InvalidArgumentException("The id '{$id}' is already in use. Please choose a unique id.");
        }

        $this->id = $id;

        return $this;
    }

    protected function withId(): array
    {
        return ['id' => $this->id];
    }
}

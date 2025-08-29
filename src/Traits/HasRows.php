<?php

namespace Hynek\Form\Traits;

trait HasRows
{
    protected int|string $rows = 3;

    public function rows(int|string $rows): static
    {
        if ($rows < 1 || (is_string($rows) && $rows !== 'auto')) {
            throw new \InvalidArgumentException('Rows must be at least 1 or \'auto\'');
        }

        $this->rows = $rows;

        return $this;
    }

    protected function withRows(): array
    {
        return ['rows' => $this->rows];
    }
}

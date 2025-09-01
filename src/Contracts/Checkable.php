<?php

namespace Hynek\Form\Contracts;

interface Checkable
{
    /**
     * Mark the element as checked.
     *
     * @return $this
     */
    public function check(): static;

    /**
     * Mark the element as unchecked.
     *
     * @return $this
     */
    public function uncheck(): static;

    /**
     * Determine if the element is checked.
     *
     * @return bool
     */
    public function isChecked(): bool;
}

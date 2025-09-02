<?php

namespace Hynek\Form\Traits;

trait AjaxSubmission
{
    protected bool $ajaxSubmission = true;

    public function enableAjax(): static
    {
        $this->ajaxSubmission = true;

        return $this;
    }

    public function disableAjax(): static
    {
        $this->ajaxSubmission = false;

        return $this;
    }
}

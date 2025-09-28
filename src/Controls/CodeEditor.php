<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasContainer;
use Hynek\Form\Traits\HasError;
use Hynek\Form\Traits\HasForm;
use Hynek\Form\Traits\HasHelpText;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasLabel;
use Hynek\Form\Traits\HasLivewireModel;
use Hynek\Form\Traits\HasName;
use Hynek\Form\Traits\HasPlaceholder;
use Hynek\Form\Traits\HasRules;
use Hynek\Form\Traits\HasValue;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;
use Illuminate\Support\Str;

class CodeEditor extends FormControl
{
    use HasAttributes,
        HasContainer,
        HasError,
        HasForm,
        HasHelpText,
        HasId,
        HasLabel,
        HasLivewireModel,
        HasName,
        HasPlaceholder,
        HasRules,
        HasValue,
        HasView,
        Renderable;

    protected string $lang = 'html';

    public function mime_type(string $mime_type): static
    {
        $this->lang = Str::after($mime_type, '/');

        return $this;
    }

    public function lang(string $lang): static
    {
        $this->lang = $lang;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withId(),
            ...$this->withLabel(),
            ...$this->withName(),
            ...$this->withPlaceholder(),
            ...$this->withError(),
            ...$this->withValue(),
            ...$this->withHelpText(),
            ...$this->withLivewireModel(),
            ...$this->withView(),
            'lang' => $this->lang,
        ];
    }
}

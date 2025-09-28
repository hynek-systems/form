<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Contracts\ElementContainer;
use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Controls\FormControl;
use Hynek\Form\EditorJS\Tool;
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
use Illuminate\Support\Collection;

class Editor extends FormControl
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

    protected array $tools = [];

    public function enableTool(Tool $tool): static
    {
        $this->tools[$tool->key] = $tool;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        $tools = collect($this->tools)->map(fn (Tool $tool) => $tool->toArray())->toArray();

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
            'tools' => $tools,
        ];
    }
}

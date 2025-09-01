<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Base;
use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasContainer;
use Hynek\Form\Traits\HasIcon;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasKeyboardShortcut;
use Hynek\Form\Traits\HasLoading;
use Hynek\Form\Traits\HasSizes;
use Hynek\Form\Traits\HasText;
use Hynek\Form\Traits\HasTooltip;
use Hynek\Form\Traits\HasType;
use Hynek\Form\Traits\HasVariants;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;
use Hynek\Form\Traits\Test\ButtonAssertions;

class Button extends Base implements \Hynek\Form\Contracts\Button
{
    use ButtonAssertions,
        HasAttributes,
        HasContainer,
        HasIcon,
        HasId,
        HasKeyboardShortcut,
        HasLoading,
        HasSizes,
        HasText,
        HasTooltip,
        HasType,
        HasVariants,
        HasView,
        Renderable;

    public static array $validVariants = [
        'outline',
        'primary',
        'filled',
        'danger',
        'ghost',
        'subtle',
    ];

    public static $validTypes = [
        'button',
        'submit',
        'reset',
    ];

    protected bool $square = false;

    protected ?string $inset = null;

    public static array $validSizes = [
        'base',
        'sm',
        'xs',
    ];

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withIcon(),
            ...$this->withId(),
            ...$this->withKbd(),
            ...$this->withLoading(),
            ...$this->withSize(),
            ...$this->withText(),
            ...$this->withTooltip(),
            ...$this->withType(),
            ...$this->withVariant(),
            ...$this->withView(),
            'square' => $this->square,
            'inset' => $this->inset,
        ];
    }

    /**
     * @inheritDoc
     */
    public function square(bool $square = true): static
    {
        $this->square = $square;

        return $this;
    }

    /**
     * @inheritDoc
     */
    public function inset(string $inset): static
    {
        $this->inset = $inset;

        return $this;
    }
}

<?php

namespace Hynek\Form\Controls;

use Hynek\Form\Contracts\ElementContainer;
use Hynek\Form\Contracts\FormBuilder;
use Hynek\Form\Controls\FormControl;
use Hynek\Form\Traits\HasAttributes;
use Hynek\Form\Traits\HasContainer;
use Hynek\Form\Traits\HasDisabled;
use Hynek\Form\Traits\HasError;
use Hynek\Form\Traits\HasForm;
use Hynek\Form\Traits\HasHelpText;
use Hynek\Form\Traits\HasId;
use Hynek\Form\Traits\HasLabel;
use Hynek\Form\Traits\HasLivewireModel;
use Hynek\Form\Traits\HasMultiple;
use Hynek\Form\Traits\HasName;
use Hynek\Form\Traits\HasRequired;
use Hynek\Form\Traits\HasRules;
use Hynek\Form\Traits\HasValue;
use Hynek\Form\Traits\HasView;
use Hynek\Form\Traits\Renderable;
use Illuminate\Support\Collection;

class File extends FormControl
{
    use HasAttributes,
        HasContainer,
        HasDisabled,
        HasError,
        HasForm,
        HasHelpText,
        HasId,
        HasLabel,
        HasLivewireModel,
        HasMultiple,
        HasName,
        HasRequired,
        HasRules,
        HasValue,
        HasView,
        Renderable;

    protected ?string $uploadUrl = null;

    protected ?string $revertUrl = null;

    protected ?string $restoreUrl = null;

    protected ?string $chunkUrl = null;

    protected ?string $loadUrl = null;

    protected bool $allowDrop = true;

    protected bool $allowBrowse = true;

    protected bool $allowPaste = true;

    protected bool $allowReplace = true;

    protected bool $allowRevert = true;

    protected bool $allowRemove = true;

    protected bool $allowReorder = false;

    protected bool $storeAsFile = false;

    protected bool $forceRevert = false;

    protected ?int $maxFiles = null;

    protected int $maxParallelUploads = 2;

    protected bool $checkValidity = false;

    protected bool $dropOnPage = false;

    protected bool $dropOnElement = true;

    protected bool $dropValidation = false;

    protected bool $instantUpload = true;

    protected bool $chunkUploads = false;

    protected int $chunkSize = 5000000;

    protected array $acceptedFileTypes = [];

    /**
     * @var array<int>|int[]
     */
    protected array $chunkRetryDelays = [500,1000,3000];

    public function uploadUrl(?string $url = null): static
    {
        $this->uploadUrl = $url;

        return $this;
    }

    public function revertUrl(?string $url = null): static
    {
        $this->revertUrl = $url;

        return $this;
    }

    public function restoreUrl(?string $url = null): static
    {
        $this->restoreUrl = $url;

        return $this;
    }

    public function chunkUrl(?string $url = null): static
    {
        $this->chunkUrl = $url;

        return $this;
    }

    public function loadUrl(?string $url = null): static
    {
        $this->loadUrl = $url;

        return $this;
    }

    /**
     * Enable or disable drag n' drop
     *
     * @param  bool  $allowDrop
     * @return $this
     */
    public function allowDrop(bool $allowDrop = true): static
    {
        $this->allowDrop = $allowDrop;

        return $this;
    }

    /**
     * Enable or disable file browser
     *
     * @param  bool  $allowBrowse
     * @return $this
     */
    public function allowBrowse(bool $allowBrowse = true): static
    {
        $this->allowBrowse = $allowBrowse;

        return $this;
    }

    /**
     * Enable or disable pasting of files. Pasting files is not supported on all browesrs.
     *
     * @param  bool  $allowPaste
     * @return $this
     */
    public function allowPaste(bool $allowPaste = true): static
    {
        $this->allowPaste = $allowPaste;

        return $this;
    }

    /**
     * Allow drop to replace a file, only works when multiple is false
     *
     * @param  bool  $allowReplace
     * @return $this
     */
    public function allowReplace(bool $allowReplace = true): static
    {
        $this->allowReplace = $allowReplace;

        return $this;
    }

    /**
     * Enable or disable the revert processing button
     *
     * @param  bool  $allowRevert
     * @return $this
     */
    public function allowRevert(bool $allowRevert = true): static
    {
        $this->allowRevert = $allowRevert;

        return $this;
    }

    /**
     * When set to false the remove button is hidden and disabled
     *
     * @param  bool  $allowRemove
     * @return $this
     */
    public function allowRemove(bool $allowRemove = true): static
    {
        $this->allowRemove = $allowRemove;

        return $this;
    }

    /**
     * Allow users to reorder files with drag and drop interaction. Note that this only works in single column mode. It
     * also only works on browsers that support pointer events.
     *
     * @param  bool  $allowReorder
     * @return $this
     */
    public function allowReorder(bool $allowReorder = true): static
    {
        $this->allowReorder = $allowReorder;

        return $this;
    }

    /**
     * Tells FilePond to store files in hidden file input elements so they can be posted along with normal form post.
     * This only works if the browser supports the DataTransfer constructor, this is the case on Firefox, Chrome,
     * Chromium powered browsers and Safari version 14.1 and higher.
     *
     * @param  bool  $storeAsFile
     * @return $this
     */
    public function storeAsFile(bool $storeAsFile = true): static
    {
        $this->storeAsFile = $storeAsFile;

        return $this;
    }

    /**
     * Set to true to require the file to be successfully reverted before continuing
     *
     * @param  bool  $forceRevert
     * @return $this
     */
    public function forceRevert(bool $forceRevert = true): static
    {
        $this->forceRevert = $forceRevert;

        return $this;
    }

    /**
     * The maximum number of files that the pond can handle
     *
     * @param  int  $maxFiles
     * @return $this
     */
    public function maxFiles(int $maxFiles): static
    {
        $this->maxFiles = $maxFiles;

        return $this;
    }

    /**
     * The maxmimum number of files that can be uploaded in parallel
     *
     * @param  int  $maxParallelUploads
     * @return $this
     */
    public function maxParallelUploads(int $maxParallelUploads = 2): static
    {
        $this->maxParallelUploads = $maxParallelUploads;

        return $this;
    }

    /**
     * Set to true to enable custom validity messages. FilePond will throw an error when a parent form is submitted and
     * it contains invalid files.
     *
     * @param  bool  $checkValidity
     * @return $this
     */
    public function checkValidity(bool $checkValidity = true): static
    {
        $this->checkValidity = $checkValidity;

        return $this;
    }

    /**
     * FilePond will catch all files dropped on the webpage
     *
     * @param  bool  $dropOnPage
     * @return $this
     */
    public function dropOnPage(bool $dropOnPage = true): static
    {
        $this->dropOnPage = $dropOnPage;

        return $this;
    }

    /**
     * Require drop on the FilePond element itself to catch the file.
     *
     * @param  bool  $dropOnElement
     * @return $this
     */
    public function dropOnElement(bool $dropOnElement = true): static
    {
        $this->dropOnElement = $dropOnElement;

        return $this;
    }

    /**
     * When enabled, files are validated before they are dropped. A file is not added when it's invalid.
     *
     * @param  bool  $dropValidation
     * @return $this
     */
    public function dropValidation(bool $dropValidation = true): static
    {
        $this->dropValidation = $dropValidation;

        return $this;
    }

    /**
     * Immediately upload new files to the server
     *
     * @param  bool  $instantUpload
     * @return $this
     */
    public function instantUpload(bool $instantUpload = true): static
    {
        $this->instantUpload = $instantUpload;

        return $this;
    }

    /**
     * Enable chunked uploads, when enabled will automatically cut up files in chunkSize chunks before upload
     *
     * @param  bool  $chunkUploads
     * @return $this
     */
    public function chunkUploads(bool $chunkUploads = true): static
    {
        $this->chunkUploads = $chunkUploads;

        return $this;
    }

    /**
     * The size of a chunk in bytes
     *
     * @param  int  $chunkSize
     * @return $this
     */
    public function chunkSize(int $chunkSize): static
    {
        $this->chunkSize = $chunkSize;

        return $this;
    }

    /**
     * Amount of times, and delayes, between retried uploading of a chunk
     *
     * @param  array<int, int>|int[]  $chunkRetryDelays
     * @return $this
     */
    public function chunkRetryDelays(array $chunkRetryDelays): static
    {
        $this->chunkRetryDelays = $chunkRetryDelays;

        return $this;
    }

    /**
     * Allowed filetypes to be uploaded.
     *
     * @param  array<int, string>  $acceptedFileTypes
     * @return $this
     */
    public function acceptedFileTypes(array $acceptedFileTypes): static
    {
        $this->acceptedFileTypes = $acceptedFileTypes;

        return $this;
    }

    public function boot()
    {
        parent::boot();

        $this->uploadUrl = route('upload.process');
        $this->revertUrl = route('upload.revert');
        $this->chunkUrl = route('upload.chunk');
        $this->restoreUrl = route('upload.restore');
        $this->loadUrl = route('upload.load');
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
            ...$this->withAttributes(),
            ...$this->withDisabled(),
            ...$this->withError(),
            ...$this->withHelpText(),
            ...$this->withId(),
            ...$this->withLabel(),
            ...$this->withLivewireModel(),
            ...$this->withMultiple(),
            ...$this->withRequired(),
            ...$this->withValue(),
            ...$this->withView(),
            ['name' => $this->multiple ? $this->name.'[]' : $this->name],
            ['uploadUrl' => $this->uploadUrl],
            ['revertUrl' => $this->revertUrl],
            ['restoreUrl' => $this->restoreUrl],
            ['chunkUrl' => $this->chunkUrl],
            ['loadUrl' => $this->loadUrl],
            ['allowDrop' => $this->allowDrop],
            ['allowBrowse' => $this->allowBrowse],
            ['allowPaste' => $this->allowPaste],
            ['allowReplace' => $this->allowReplace],
            ['allowRevert' => $this->allowRevert],
            ['allowRemove' => $this->allowRemove],
            ['allowReorder' => $this->allowReorder],
            ['storeAsFile' => $this->storeAsFile],
            ['forceRevert' => $this->forceRevert],
            ['maxFiles' => $this->maxFiles],
            ['maxParallelUploads' => $this->maxParallelUploads],
            ['checkValidity' => $this->checkValidity],
            ['dropOnPage' => $this->dropOnPage],
            ['dropOnElement' => $this->dropOnElement],
            ['dropValidation' => $this->dropValidation],
            ['instantUpload' => $this->instantUpload],
            ['chunkUploads' => $this->chunkUploads],
            ['chunkSize' => $this->chunkSize],
            ['chunkRetryDelays' => $this->chunkRetryDelays],
        ];
    }
}

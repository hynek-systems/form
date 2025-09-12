<?php

namespace Hynek\Form;

use Illuminate\Support\Str;

class FormRegistry
{
    /** @var array<string, class-string<Form>> */
    protected array $forms = [];

    public function __construct()
    {
        $this->forms = cache()->get('scanned_forms', []);
    }

    public function register(string $alias, string $class): void
    {
        $this->forms[$alias] = $class;
    }

    public function get(string $alias): ?Form
    {
        if (! isset($this->forms[$alias])) {
            return null;
        }

        $class = $this->forms[$alias];
        return app($class); // resolve from container
    }

    public function all(): array
    {
        return $this->forms;
    }

    /**
     * Helper: auto-generate alias from class name
     * Example: CreateTenantForm -> create-tenant
     */
    public function autoRegister(string $class): array
    {
        $basename = class_basename($class); // e.g. "CreateTenantForm"
        $alias = Str::kebab(Str::replaceLast('Form', '', $basename)); // "create-tenant"
        $this->register($alias, $class);

        return [$alias => $class];
    }
}

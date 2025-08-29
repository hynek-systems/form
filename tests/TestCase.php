<?php

namespace Hynek\Form\Tests;

use Hynek\Form\FormServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        // Additional setup if needed
    }

    protected function getPackageProviders($app)
    {
        return [
            FormServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app)
    {
        // Configure test environment
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);
    }

    protected function defineDatabaseMigrations()
    {
        // Load your package migrations
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }
}

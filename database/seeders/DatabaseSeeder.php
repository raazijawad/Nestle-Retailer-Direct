<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed only the 5 Nestlé products
        // All user accounts (retailers, distributors, admins) must be created manually
        $this->call([
            ProductSeeder::class,
        ]);
    }
}

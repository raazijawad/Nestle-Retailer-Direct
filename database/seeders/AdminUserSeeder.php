<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@nestle.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('admin123'),
                'role' => 'admin',
            ]
        );
    }
}

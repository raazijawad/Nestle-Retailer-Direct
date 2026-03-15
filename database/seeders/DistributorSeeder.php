<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\DistributorProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DistributorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $distributors = [
            [
                'name' => 'Janaka',
                'email' => 'janaka@nestle.com',
                'company_name' => 'Akurana Branch',
                'company_address' => 'Main Street, Akurana',
                'company_city' => 'Kandy',
                'company_phone' => '0812345678',
            ],
            [
                'name' => 'Kamal Perera',
                'email' => 'kamal@nestle.com',
                'company_name' => 'Kandy Distribution Center',
                'company_address' => 'Distributor Road',
                'company_city' => 'Kandy',
                'company_phone' => '0812345679',
            ],
            [
                'name' => 'Sunil Silva',
                'email' => 'sunil@nestle.com',
                'company_name' => 'Colombo Branch',
                'company_address' => 'High Level Road',
                'company_city' => 'Colombo',
                'company_phone' => '0112345678',
            ],
        ];

        foreach ($distributors as $distributorData) {
            $user = User::create([
                'name' => $distributorData['name'],
                'email' => $distributorData['email'],
                'password' => Hash::make('password123'),
                'role' => 'distributor',
            ]);

            DistributorProfile::create([
                'user_id' => $user->id,
                'company_name' => $distributorData['company_name'],
                'company_address' => $distributorData['company_address'],
                'company_city' => $distributorData['company_city'],
                'company_phone' => $distributorData['company_phone'],
            ]);
        }
    }
}

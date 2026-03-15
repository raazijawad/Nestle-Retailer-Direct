<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use App\Models\ShopProfile;
use App\Models\DistributorProfile;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'role' => ['required', 'in:retailer,distributor'],
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => $input['role'],
        ]);

        // Create profile based on role
        if ($input['role'] === 'retailer') {
            ShopProfile::create([
                'user_id' => $user->id,
                'shop_name' => $input['shop_name'] ?? null,
                'shop_address' => $input['shop_address'] ?? null,
                'shop_city' => $input['shop_city'] ?? null,
                'shop_phone' => $input['shop_phone'] ?? null,
            ]);
        } elseif ($input['role'] === 'distributor') {
            DistributorProfile::create([
                'user_id' => $user->id,
                'company_name' => $input['company_name'] ?? null,
                'company_address' => $input['company_address'] ?? null,
                'company_city' => $input['company_city'] ?? null,
                'company_phone' => $input['company_phone'] ?? null,
            ]);
        }

        return $user;
    }
}

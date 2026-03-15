<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class QuickReorderController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'image' => $product->image_url ?? '/images/placeholder-product.png',
                'stock_quantity' => $product->stock_quantity ?? 0,
            ];
        });

        // Get distributors (users with distributor role)
        $distributors = User::where('role', 'distributor')
            ->with('distributorProfile')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'company_name' => $user->distributorProfile?->company_name ?? null,
                ];
            });

        return inertia('quick-reorder', [
            'products' => $products,
            'distributors' => $distributors,
        ]);
    }
}

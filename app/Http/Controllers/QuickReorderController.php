<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\RetailerInventory;
use App\Models\User;
use Illuminate\Http\Request;

class QuickReorderController extends Controller
{
    public function index()
    {
        $retailerId = auth()->id();

        $products = Product::all()->map(function ($product) use ($retailerId) {
            // Get retailer's personal inventory quantity
            $retailerInventory = RetailerInventory::where('user_id', $retailerId)
                ->where('product_id', $product->id)
                ->first();

            $retailerQuantity = $retailerInventory ? $retailerInventory->stock_quantity : 0;

            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'image' => $product->image_url ?? '/images/placeholder-product.png',
                'stock_quantity' => $retailerQuantity,
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

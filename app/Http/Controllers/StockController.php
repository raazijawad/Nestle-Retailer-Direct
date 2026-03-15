<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class StockController extends Controller
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
                'stock_status' => $product->stock_quantity > 20 ? 'in_stock' : ($product->stock_quantity > 0 ? 'low_stock' : 'out_of_stock'),
                'stock_quantity' => $product->stock_quantity ?? 0,
            ];
        });

        return inertia('stock/index', [
            'products' => $products,
            'categories' => [],
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'stock_quantity' => 'required|integer|min:0',
        ]);

        $product->update([
            'stock_quantity' => $validated['stock_quantity'],
        ]);

        return back()->with('success', 'Stock quantity updated successfully.');
    }
}

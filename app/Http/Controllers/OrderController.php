<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Store a new order.
     */
    public function store(Request $request)
    {
        \Log::info('Order request data:', $request->all());

        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|integer|exists:products,id',
            'items.*.product_name' => 'required|string',
            'items.*.product_image' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ], [
            'items.required' => 'Please select at least one item to order.',
            'items.min' => 'Please select at least one item to order.',
        ]);

        \Log::info('Validated data:', $validated);

        $totalAmount = 0;
        foreach ($validated['items'] as $item) {
            $totalAmount += $item['quantity'] * $item['price'];
        }

        $order = Order::create([
            'user_id' => Auth::id(),
            'status' => 'pending',
            'total_amount' => $totalAmount,
        ]);

        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'] ?? null,
                'product_name' => $item['product_name'],
                'product_image' => $item['product_image'] ?? null,
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price'],
            ]);

            // Increase stock quantity for the product (adding to inventory)
            if (!empty($item['product_id'])) {
                $product = Product::find($item['product_id']);
                if ($product) {
                    $newQuantity = $product->stock_quantity + $item['quantity'];
                    $product->update(['stock_quantity' => $newQuantity]);
                }
            }
        }

        return redirect()->back()->with('success', 'Order placed successfully!');
    }

    /**
     * Display all orders for admin dashboard.
     */
    public function index()
    {
        $orders = Order::with(['user', 'items'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'total_amount' => (float) $order->total_amount,
                    'created_at' => $order->created_at->diffForHumans(),
                    'created_date' => $order->created_at->format('M d, Y'),
                    'user' => [
                        'id' => $order->user->id,
                        'name' => $order->user->name,
                        'email' => $order->user->email,
                    ],
                    'items' => $order->items->map(function ($item) {
                        return [
                            'product_name' => $item->product_name,
                            'product_image' => $item->product_image,
                            'quantity' => (int) $item->quantity,
                            'price' => (float) $item->price,
                            'subtotal' => (float) $item->subtotal,
                        ];
                    })->toArray(),
                ];
            })->toArray();

        $stats = [
            'total_orders' => (int) Order::count(),
            'pending_orders' => (int) Order::where('status', 'pending')->count(),
            'total_revenue' => (float) Order::sum('total_amount'),
        ];

        \Log::info('Orders data sent to frontend:', ['orders' => $orders, 'stats' => $stats]);

        return inertia('dashboard/orders', [
            'orders' => $orders,
            'stats' => $stats,
        ]);
    }

    /**
     * Approve an order.
     */
    public function approve(Order $order)
    {
        $order->update(['status' => 'approved']);

        return redirect()->back()->with('success', 'Order approved successfully!');
    }

    /**
     * Reject an order.
     */
    public function reject(Order $order)
    {
        $order->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Order rejected.');
    }
}

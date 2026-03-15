<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    /**
     * Display distributor home page.
     */
    public function home()
    {
        $user = auth()->user();
        $distributorProfile = $user->distributorProfile;

        // Get quick stats
        $stats = [
            'pending_orders' => Order::where('status', 'pending')->count(),
            'total_retailers' => User::where('role', 'retailer')->count(),
            'in_transit' => Order::where('status', 'in_transit')->count(),
        ];

        return inertia('distributor-home', [
            'name' => $user->name,
            'companyName' => $distributorProfile?->company_name ?? 'Distributor',
            'stats' => $stats,
        ]);
    }

    /**
     * Display distributor orders (DF04, DF05).
     */
    public function orders(Request $request)
    {
        $query = Order::with(['user', 'items']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->latest()->get()->map(function ($order) {
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
                    'shop_name' => $order->user->shopProfile?->shop_name,
                ],
                'items' => $order->items->map(function ($item) {
                    return [
                        'product_name' => $item->product_name,
                        'quantity' => (int) $item->quantity,
                        'price' => (float) $item->price,
                        'subtotal' => (float) $item->subtotal,
                    ];
                })->toArray(),
            ];
        })->toArray();

        return inertia('distributor/orders', [
            'orders' => $orders,
            'stats' => [
                'total_orders' => Order::count(),
                'pending_orders' => Order::where('status', 'pending')->count(),
                'approved_orders' => Order::where('status', 'approved')->count(),
                'in_transit' => Order::where('status', 'in_transit')->count(),
                'delivered' => Order::where('status', 'delivered')->count(),
            ],
        ]);
    }

    /**
     * Approve an order (DF04).
     */
    public function approveOrder(Order $order)
    {
        $order->update(['status' => 'approved']);
        return redirect()->back()->with('success', 'Order approved successfully!');
    }

    /**
     * Reject an order (DF04).
     */
    public function rejectOrder(Order $order)
    {
        $order->update(['status' => 'rejected']);
        return redirect()->back()->with('success', 'Order rejected.');
    }

    /**
     * Update order status (DF05).
     */
    public function updateOrderStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,in_transit,delivered',
        ]);

        $order->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

    /**
     * Display delivery tracking (DF07, DF09).
     */
    public function delivery()
    {
        $orders = Order::with(['user'])
            ->whereIn('status', ['approved', 'in_transit'])
            ->latest()
            ->get();

        return inertia('distributor/delivery', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display statistics (DF08).
     */
    public function statistics()
    {
        $stats = [
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total_amount'),
            'total_retailers' => User::where('role', 'retailer')->count(),
            'orders_by_status' => Order::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->get()
                ->pluck('count', 'status')
                ->toArray(),
        ];

        return inertia('distributor/statistics', [
            'stats' => $stats,
        ]);
    }

    /**
     * Display delivery schedule (DF07).
     */
    public function schedule()
    {
        return inertia('distributor/schedule');
    }

    /**
     * Display retailers management (DF08).
     */
    public function retailers()
    {
        $retailers = User::where('role', 'retailer')
            ->with(['shopProfile', 'orders'])
            ->get()
            ->map(function ($retailer) {
                return [
                    'id' => $retailer->id,
                    'name' => $retailer->name,
                    'email' => $retailer->email,
                    'shop_name' => $retailer->shopProfile?->shop_name,
                    'shop_city' => $retailer->shopProfile?->shop_city,
                    'total_orders' => $retailer->orders->count(),
                    'total_spent' => $retailer->orders->sum('total_amount'),
                ];
            });

        return inertia('distributor/retailers', [
            'retailers' => $retailers,
        ]);
    }

    /**
     * Display tracking dashboard (DF09).
     */
    public function dashboard()
    {
        $stats = [
            'pending_orders' => Order::where('status', 'pending')->count(),
            'approved_orders' => Order::where('status', 'approved')->count(),
            'in_transit' => Order::where('status', 'in_transit')->count(),
            'delivered' => Order::where('status', 'delivered')->count(),
            'rejected_orders' => Order::where('status', 'rejected')->count(),
        ];

        return inertia('distributor/dashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * Display notifications.
     */
    public function notifications()
    {
        return inertia('distributor/notifications');
    }
}

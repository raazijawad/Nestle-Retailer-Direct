<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\RetailerInventory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * Display retailer orders assigned to this distributor.
     */
    public function retailerOrders(Request $request)
    {
        $distributorId = auth()->id();
        
        $query = Order::with(['user', 'items'])
            ->where('distributor_id', $distributorId);

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

        return inertia('distributor/retailer-orders', [
            'orders' => $orders,
            'stats' => [
                'total_orders' => Order::where('distributor_id', $distributorId)->count(),
                'pending_orders' => Order::where('distributor_id', $distributorId)->where('status', 'pending')->count(),
                'approved_orders' => Order::where('distributor_id', $distributorId)->where('status', 'approved')->count(),
                'rejected_orders' => Order::where('distributor_id', $distributorId)->where('status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Display incoming orders (new UI).
     */
    public function incomingOrders(Request $request)
    {
        $distributorId = auth()->id();
        
        $query = Order::with(['user', 'items'])
            ->where('distributor_id', $distributorId);

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

        return inertia('distributor/incoming-orders', [
            'orders' => $orders,
            'stats' => [
                'total_orders' => Order::where('distributor_id', $distributorId)->count(),
                'pending_orders' => Order::where('distributor_id', $distributorId)->where('status', 'pending')->count(),
                'approved_orders' => Order::where('distributor_id', $distributorId)->where('status', 'approved')->count(),
                'rejected_orders' => Order::where('distributor_id', $distributorId)->where('status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Approve an incoming order.
     */
    public function approveIncomingOrder(Order $order)
    {
        // Verify the order belongs to this distributor
        if ($order->distributor_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Load order items
        $order->load('items');

        $order->update(['status' => 'approved']);

        // Get the retailer (user who placed the order)
        $retailerId = $order->user_id;

        // Process each order item
        foreach ($order->items as $item) {
            if (!empty($item->product_id)) {
                // Decrease stock from distributor warehouse
                $product = Product::find($item->product_id);
                if ($product) {
                    $newWarehouseQuantity = $product->stock_quantity - $item->quantity;
                    $product->update(['stock_quantity' => max(0, $newWarehouseQuantity)]);
                }

                // Increase stock in retailer inventory
                $retailerInventory = RetailerInventory::where('user_id', $retailerId)
                    ->where('product_id', $item->product_id)
                    ->first();

                if ($retailerInventory) {
                    // Update existing inventory
                    $retailerInventory->increment('stock_quantity', $item->quantity);
                } else {
                    // Create new inventory record
                    RetailerInventory::create([
                        'user_id' => $retailerId,
                        'product_id' => $item->product_id,
                        'stock_quantity' => $item->quantity,
                    ]);
                }
            }
        }

        return redirect()->back()->with('success', 'Order approved successfully!');
    }

    /**
     * Reject an incoming order.
     */
    public function rejectIncomingOrder(Order $order)
    {
        // Verify the order belongs to this distributor
        if ($order->distributor_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
        
        $order->update(['status' => 'rejected']);
        return redirect()->back()->with('success', 'Order rejected.');
    }

    /**
     * Approve an order (DF04).
     */
    public function approveOrder(Order $order)
    {
        // Load order items
        $order->load('items');

        $order->update(['status' => 'approved']);

        // Get the retailer (user who placed the order)
        $retailerId = $order->user_id;

        // Process each order item
        foreach ($order->items as $item) {
            if (!empty($item->product_id)) {
                // Decrease stock from distributor warehouse
                $product = Product::find($item->product_id);
                if ($product) {
                    $newWarehouseQuantity = $product->stock_quantity - $item->quantity;
                    $product->update(['stock_quantity' => max(0, $newWarehouseQuantity)]);
                }

                // Increase stock in retailer inventory
                $retailerInventory = RetailerInventory::where('user_id', $retailerId)
                    ->where('product_id', $item->product_id)
                    ->first();

                if ($retailerInventory) {
                    // Update existing inventory
                    $retailerInventory->increment('stock_quantity', $item->quantity);
                } else {
                    // Create new inventory record
                    RetailerInventory::create([
                        'user_id' => $retailerId,
                        'product_id' => $item->product_id,
                        'stock_quantity' => $item->quantity,
                    ]);
                }
            }
        }

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
     * Approve a retailer order.
     */
    public function approveRetailerOrder(Order $order)
    {
        // Verify the order belongs to this distributor
        if ($order->distributor_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Load order items
        $order->load('items');

        $order->update(['status' => 'approved']);

        // Get the retailer (user who placed the order)
        $retailerId = $order->user_id;

        // Process each order item
        foreach ($order->items as $item) {
            if (!empty($item->product_id)) {
                // Decrease stock from distributor warehouse
                $product = Product::find($item->product_id);
                if ($product) {
                    $newWarehouseQuantity = $product->stock_quantity - $item->quantity;
                    $product->update(['stock_quantity' => max(0, $newWarehouseQuantity)]);
                }

                // Increase stock in retailer inventory
                $retailerInventory = RetailerInventory::where('user_id', $retailerId)
                    ->where('product_id', $item->product_id)
                    ->first();

                if ($retailerInventory) {
                    // Update existing inventory
                    $retailerInventory->increment('stock_quantity', $item->quantity);
                } else {
                    // Create new inventory record
                    RetailerInventory::create([
                        'user_id' => $retailerId,
                        'product_id' => $item->product_id,
                        'stock_quantity' => $item->quantity,
                    ]);
                }
            }
        }

        return redirect()->back()->with('success', 'Order approved successfully!');
    }

    /**
     * Reject a retailer order.
     */
    public function rejectRetailerOrder(Order $order)
    {
        // Verify the order belongs to this distributor
        if ($order->distributor_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
        
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

    /**
     * Display warehouse inventory.
     */
    public function warehouseInventory()
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

        $stats = [
            'total_products' => Product::count(),
            'in_stock' => Product::where('stock_quantity', '>', 20)->count(),
            'low_stock' => Product::where('stock_quantity', '>', 0)->where('stock_quantity', '<=', 20)->count(),
            'out_of_stock' => Product::where('stock_quantity', 0)->count(),
        ];

        return inertia('distributor/warehouse-inventory', [
            'products' => $products,
            'stats' => $stats,
        ]);
    }
}

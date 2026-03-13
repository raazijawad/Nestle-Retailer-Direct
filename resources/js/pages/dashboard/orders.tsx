import { Head } from '@inertiajs/react';
import { ShoppingCart, Package, DollarSign, Clock, User, Mail } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface OrderItem {
    product_name: string;
    product_image: string | null;
    quantity: number;
    price: number;
    subtotal: number;
}

interface OrderUser {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    created_date: string;
    user: OrderUser;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
    stats: {
        total_orders: number;
        pending_orders: number;
        total_revenue: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Retailer Orders',
        href: '/dashboard/orders',
    },
];

function getStatusBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
        case 'pending':
            return 'secondary';
        case 'approved':
            return 'default';
        case 'rejected':
            return 'destructive';
        case 'completed':
            return 'outline';
        default:
            return 'outline';
    }
}

export default function Orders({ orders, stats }: Props) {
    console.log('Orders page received:', { orders, stats });
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Retailer Orders" />

            <div className="flex flex-col gap-6 p-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Retailer Orders</h1>
                    <p className="text-muted-foreground mt-1">View and manage all retailer orders</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_orders}</div>
                            <p className="text-xs text-muted-foreground">All time orders</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending_orders}</div>
                            <p className="text-xs text-muted-foreground">Awaiting review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.total_revenue.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">All time revenue</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">No orders yet</h3>
                                <p className="text-muted-foreground">Orders from retailers will appear here</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00447C] to-[#003d6f] flex items-center justify-center text-white font-semibold">
                                                    {order.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{order.user.name}</div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Mail className="h-3 w-3" />
                                                        {order.user.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant={getStatusBadgeVariant(order.status)}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                                <div className="text-right">
                                                    <div className="font-semibold">${order.total_amount.toFixed(2)}</div>
                                                    <div className="text-xs text-muted-foreground">{order.created_at}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="border-t pt-3">
                                            <div className="text-xs font-medium text-muted-foreground mb-2">Order Items:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {order.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 bg-muted/50 rounded-md px-2 py-1.5"
                                                    >
                                                        {item.product_image && (
                                                            <img
                                                                src={item.product_image}
                                                                alt={item.product_name}
                                                                className="h-6 w-6 rounded object-cover"
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="text-xs font-medium">{item.product_name}</div>
                                                            <div className="text-[10px] text-muted-foreground">
                                                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

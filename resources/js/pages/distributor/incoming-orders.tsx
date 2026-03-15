import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, User, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

interface OrderUser {
    id: number;
    name: string;
    email: string;
    shop_name: string | null;
}

interface Order {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    user: OrderUser;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
    stats: {
        total_orders: number;
        pending_orders: number;
        approved_orders: number;
        rejected_orders: number;
    };
}

function getStatusBadgeClass(status: string): string {
    switch (status) {
        case 'pending':
            return 'bg-amber-500 text-white';
        case 'approved':
            return 'bg-emerald-500 text-white';
        case 'rejected':
            return 'bg-red-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
}

export default function IncomingOrders({ orders, stats }: Props) {
    const { toast } = useToast();
    const [filter, setFilter] = useState('all');

    const handleApprove = (orderId: number) => {
        router.post(`/distributor/incoming-orders/${orderId}/approve`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Order approved!',
                    description: 'The retailer order has been approved.',
                });
            },
            onError: () => {
                toast({
                    title: 'Failed to approve',
                    description: 'There was an error approving the order.',
                    variant: 'destructive',
                });
            },
        });
    };

    const handleReject = (orderId: number) => {
        router.post(`/distributor/incoming-orders/${orderId}/reject`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Order rejected',
                    description: 'The retailer order has been rejected.',
                });
            },
            onError: () => {
                toast({
                    title: 'Failed to reject',
                    description: 'There was an error rejecting the order.',
                    variant: 'destructive',
                });
            },
        });
    };

    const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
    const otherOrders = filteredOrders.filter(o => o.status !== 'pending');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Head title="Incoming Orders" />

            {/* Header */}
            <header className="bg-white border-b shadow-sm sticky top-0 z-50">
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Incoming Orders</h1>
                            <p className="text-sm text-gray-500 mt-1">Review and manage retailer orders</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                {stats.pending_orders} Pending
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container py-6 pb-24">
                <div className="flex flex-col gap-6">
                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card className="border-l-4 border-l-blue-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                                <Package className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">{stats.total_orders}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-amber-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Awaiting Review</CardTitle>
                                <Clock className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-amber-600">{stats.pending_orders}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-emerald-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-emerald-600">{stats.approved_orders}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-red-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
                                <XCircle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-red-600">{stats.rejected_orders}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        {['all', 'pending', 'approved', 'rejected'].map((status) => (
                            <Button
                                key={status}
                                variant={filter === status ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter(status)}
                                className={filter === status ? 'bg-[#00447C] hover:bg-[#003d6f]' : ''}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Button>
                        ))}
                    </div>

                    {/* Pending Orders Section */}
                    {pendingOrders.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                <h2 className="text-base font-semibold text-gray-900">Pending Approval</h2>
                                <Badge className="bg-amber-500 text-xs">{pendingOrders.length}</Badge>
                            </div>
                            <div className="grid gap-3">
                                {pendingOrders.map((order) => (
                                    <Card key={order.id} className="border-amber-200 bg-amber-50/50">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-base">
                                                        {order.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-base text-gray-900">{order.user.name}</div>
                                                        <div className="text-xs text-gray-600">
                                                            {order.user.shop_name || order.user.email}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-0.5">{order.created_at}</div>
                                                    </div>
                                                </div>
                                                <Badge className={getStatusBadgeClass(order.status)} variant="outline">
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                            </div>

                                            {/* Order Items */}
                                            <div className="bg-white rounded-md p-3 mb-3">
                                                <div className="text-xs font-medium text-gray-700 mb-2">Order Items:</div>
                                                <div className="space-y-1.5">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex items-center justify-between text-xs">
                                                            <span className="text-gray-700">{item.product_name}</span>
                                                            <span className="text-gray-600">
                                                                {item.quantity} × ${item.price.toFixed(2)} = 
                                                                <span className="font-semibold text-gray-900 ml-1">
                                                                    ${item.subtotal.toFixed(2)}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Total and Actions */}
                                            <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                                                <div className="text-lg font-bold text-gray-900">
                                                    ${order.total_amount.toFixed(2)}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleReject(order.id)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 h-8"
                                                    >
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleApprove(order.id)}
                                                        size="sm"
                                                        className="bg-emerald-600 hover:bg-emerald-700 h-8"
                                                    >
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Approve
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other Orders Section */}
                    {otherOrders.length > 0 && (
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="h-5 w-5 text-gray-500" />
                                <h2 className="text-lg font-semibold text-gray-900">Processed Orders</h2>
                                <Badge variant="outline">{otherOrders.length}</Badge>
                            </div>
                            <div className="grid gap-4">
                                {otherOrders.map((order) => (
                                    <Card key={order.id} className={order.status === 'approved' ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200 bg-red-50/30'}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                                                        order.status === 'approved' 
                                                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
                                                            : 'bg-gradient-to-br from-red-400 to-red-600'
                                                    }`}>
                                                        {order.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{order.user.name}</div>
                                                        <div className="text-sm text-gray-600">
                                                            {order.user.shop_name || order.user.email}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">{order.created_at}</div>
                                                    </div>
                                                </div>
                                                <Badge className={getStatusBadgeClass(order.status)}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                                <div className="text-sm text-gray-600">
                                                    {order.items.length} items
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">
                                                    ${order.total_amount.toFixed(2)}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredOrders.length === 0 && (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <Package className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">No orders found</h3>
                                <p className="text-gray-500 mt-1">No orders match the selected filter</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}

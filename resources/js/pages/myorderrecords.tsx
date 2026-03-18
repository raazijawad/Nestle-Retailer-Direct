import { Head } from '@inertiajs/react';
import { Clock, Package, Calendar, DollarSign, ChevronRight, Home, ShoppingCart, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

interface OrderItem {
    product_name: string;
    product_image: string | null;
    quantity: number;
    price: number;
    subtotal: number;
}

interface Order {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    created_date: string;
    distributor_name: string;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
    stats: {
        total_orders: number;
        pending_orders: number;
        completed_orders: number;
        total_spent: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'My Orders',
        href: '/my-orders',
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

function getStatusBadgeClass(status: string): string {
    switch (status) {
        case 'pending':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
        case 'approved':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
        case 'rejected':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'completed':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
}

export default function MyOrderRecords({ orders, stats }: Props) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
    const isLoggedIn = !!auth?.user;

    return (
        <div className="flex h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-slate-900 dark:to-blue-900">
            <Head title="My Orders" />
            {/* Header with back button only */}
            <div className="sticky top-0 z-40 bg-gradient-to-r from-[#00447C] via-[#003d6f] to-[#00284a] px-4 py-4 md:py-2">
                <div className="container">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                        <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <ChevronRight className="h-4 w-4 rotate-180" />
                            Back to Home
                        </a>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">My Order History</h1>
                    <p className="text-white/70 text-sm md:text-base mt-1">Track and manage your orders</p>
                </div>
            </div>

            <div className="flex-1 container overflow-y-auto pb-24 pt-3 md:pt-6 px-3 md:px-4">
                    {/* Stats Cards */}
                    <div className="grid gap-2 grid-cols-4 mb-4">
                        <Card className="bg-white/90 dark:bg-white/10 border-white/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 py-1.5">
                                <CardTitle className="text-[9px] md:text-[10px] font-medium">Total</CardTitle>
                                <Package className="h-3 w-3 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="py-0">
                                <div className="text-base md:text-lg font-bold">{stats.total_orders}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/90 dark:bg-white/10 border-white/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 py-1.5">
                                <CardTitle className="text-[9px] md:text-[10px] font-medium">Pending</CardTitle>
                                <Clock className="h-3 w-3 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="py-0">
                                <div className="text-base md:text-lg font-bold">{stats.pending_orders}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/90 dark:bg-white/10 border-white/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 py-1.5">
                                <CardTitle className="text-[9px] md:text-[10px] font-medium">Done</CardTitle>
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="py-0">
                                <div className="text-base md:text-lg font-bold">{stats.completed_orders}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/90 dark:bg-white/10 border-white/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 py-1.5">
                                <CardTitle className="text-[9px] md:text-[10px] font-medium">Spent</CardTitle>
                                <DollarSign className="h-3 w-3 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="py-0">
                                <div className="text-base md:text-lg font-bold">${stats.total_spent.toFixed(2)}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Orders List */}
                    <div className="container max-w-4xl mx-auto">
                    <Card className="bg-white/90 dark:bg-white/10 border-white/50 backdrop-blur-sm">
                        <CardHeader className="px-3 py-2 md:px-6 md:py-4">
                            <CardTitle className="text-sm md:text-lg">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="px-2 md:px-6">
                            {orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold">No orders yet</h3>
                                    <p className="text-muted-foreground">Your order history will appear here</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="rounded-lg border border-border p-2 md:p-2.5 hover:bg-muted/30 transition-colors"
                                        >
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                {/* Order Info */}
                                                <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-[#00447C] to-[#003d6f] flex items-center justify-center text-white font-semibold text-[10px] md:text-xs flex-shrink-0">
                                                    #{order.id}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] md:text-xs font-medium truncate">Order #{order.id}</div>
                                                    <div className="text-[9px] md:text-[10px] text-muted-foreground flex items-center gap-0.5 md:gap-1">
                                                        <Calendar className="h-2 w-2 md:h-2.5 md:w-2.5" />
                                                        <span className="truncate">{order.created_date}</span>
                                                    </div>
                                                </div>

                                                {/* Order Items */}
                                                <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto">
                                                    {order.items.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-1 md:gap-1.5 bg-muted/50 rounded-md px-1.5 md:px-2 py-1 flex-shrink-0"
                                                        >
                                                            {item.product_image && (
                                                                <img
                                                                    src={item.product_image}
                                                                    alt={item.product_name}
                                                                    className="h-4 w-4 md:h-5 md:w-5 rounded object-cover flex-shrink-0"
                                                                />
                                                            )}
                                                            <div className="min-w-0">
                                                                <div className="text-[9px] md:text-xs font-medium truncate">{item.product_name}</div>
                                                                <div className="text-[8px] md:text-[10px] text-muted-foreground whitespace-nowrap">
                                                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Status & Total */}
                                                <div className="text-right flex-shrink-0">
                                                    <Badge className={`${getStatusBadgeClass(order.status)} text-[8px] md:text-xs px-1.5 py-0 md:px-2 md:py-0.5`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </Badge>
                                                    <div className="text-[8px] md:text-[10px] text-muted-foreground mt-0.5 truncate max-w-[80px] md:max-w-none">
                                                        Dist: {order.distributor_name}
                                                    </div>
                                                    <div className="text-[10px] md:text-xs font-semibold mt-0.5">${order.total_amount.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    </div>
                </div>

                {/* Footer Navigation */}
                <footer className="fixed bottom-0 left-0 right-0 z-50">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00447C] via-[#003d6f] to-[#00284a]"></div>
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}></div>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="relative container px-4 py-3">
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-2 md:gap-4">
                            <a href="/" className="group relative flex flex-col items-center gap-1.5 p-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <Home className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                </div>
                                <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">Home</span>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                            </a>
                            <a href="/quick-reorder" className="group relative flex flex-col items-center gap-1.5 p-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <ShoppingCart className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                </div>
                                <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">Orders</span>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                            </a>
                            <a href="/stock" className="group relative flex flex-col items-center gap-1.5 p-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <User className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                </div>
                                <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">Inventory</span>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                            </a>
                            <a href="/user/profile" className="group relative flex flex-col items-center gap-1.5 p-2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <User className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                </div>
                                <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">Profile</span>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                            </a>
                            {isLoggedIn ? (
                                <form action="/logout" method="POST" className="group relative flex flex-col items-center gap-1.5 p-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <LogOut className="relative h-5 w-5 text-white/60 group-hover:text-red-300 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                    </div>
                                    <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-red-300 transition-colors duration-500">Logout</span>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                                </form>
                            ) : (
                                <a href="/login" className="group relative flex flex-col items-center gap-1.5 p-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <User className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                    </div>
                                    <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">Login</span>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="relative w-1.5 h-1.5">
                            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-ping"></div>
                            <div className="relative w-1.5 h-1.5 rounded-full bg-blue-400/60"></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

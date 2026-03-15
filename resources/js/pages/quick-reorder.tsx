import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, HelpCircle, Plus, Minus, ShoppingCart, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
}

interface OrderItem extends Product {
    status: string;
    statusColor: string;
    quantity: number;
}

// Stock status based on quantity: >20 In Stock, <=20 Low Stock, =0 Out of Stock
function getStockStatus(stockQuantity: number): { status: string; statusColor: string } {
    if (stockQuantity === 0) {
        return { status: 'Out of Stock', statusColor: 'text-red-600' };
    }
    if (stockQuantity <= 20) {
        return { status: 'Low Stock', statusColor: 'text-amber-600' };
    }
    return { status: 'In Stock', statusColor: 'text-emerald-600' };
}

interface Props {
    products: Product[];
}

export default function QuickReorder({ products }: Props) {
    const { toast } = useToast();
    
    // Initialize order items with products from database
    const [orderItems, setOrderItems] = useState<OrderItem[]>(() => 
        products.map(product => ({
            ...product,
            ...getStockStatus(product.stock_quantity),
            quantity: 0
        }))
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleQuantityChange = (id: number, delta: number) => {
        setOrderItems((prev) =>
            prev.map((order) => {
                if (order.id === id) {
                    const newQuantity = Math.max(0, order.quantity + delta);
                    return { ...order, quantity: newQuantity };
                }
                return order;
            })
        );
    };

    const handleReorder = () => {
        const itemsToOrder = orderItems.filter((item) => item.quantity > 0);

        if (itemsToOrder.length === 0) {
            toast({
                title: 'No items selected',
                description: 'Please add at least one item to your order.',
                variant: 'destructive',
            });
            return;
        }

        const orderData = {
            items: itemsToOrder.map((item) => ({
                product_id: item.id,
                product_name: item.name,
                product_image: item.image,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        console.log('Submitting order:', orderData);
        setIsSubmitting(true);

        router.post('/orders', orderData, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Order placed successfully!',
                    description: 'Your order has been submitted for review.',
                });
                // Reset quantities to 0
                setOrderItems((prev) => prev.map(item => ({ ...item, quantity: 0 })));
                setIsSubmitting(false);
            },
            onError: (errors) => {
                console.error('Order errors:', errors);
                setIsSubmitting(false);
                const errorMessages = Object.values(errors).join(' ');
                toast({
                    title: 'Order failed',
                    description: errorMessages || 'There was an error placing your order. Please try again.',
                    variant: 'destructive',
                });
            },
        });
    };

    const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e8ecf1]">
            <Head title="Quick Reorder" />

            {/* SKILL.md Designed Header */}
            <header className="sticky top-0 z-50">
                {/* Deep navy gradient base */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00447C] via-[#003d6f] to-[#00284a]"></div>

                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}></div>

                {/* Animated glow orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-0 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl"></div>
                </div>

                {/* Content */}
                <div className="relative container flex h-16 items-center justify-between px-4">
                    {/* Back button */}
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <ChevronLeft className="relative h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </Link>

                    {/* Title */}
                    <h1 className="text-base md:text-lg font-bold text-white tracking-widest uppercase">Quick Reorder</h1>

                    {/* Help button */}
                    <button className="group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <HelpCircle className="relative h-6 w-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </div>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container md:py-6 pb-32">
                {/* Frequent Orders Card */}
                <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-0">
                        {/* Card header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-[#00447C]" />
                                <h2 className="font-semibold text-gray-900">Frequent Orders</h2>
                            </div>
                            <span className="text-xs text-gray-500">{orderItems.length} items</span>
                        </div>

                        {/* Order list */}
                        <div className="divide-y divide-gray-100">
                            {orderItems.map((order) => (
                                <div key={order.id} className="flex items-center gap-3 p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    {/* Product thumbnail */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                                        <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Product info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-xs md:text-sm truncate">{order.name}</h3>
                                        <p className={`text-xs font-medium mt-0.5 ${order.statusColor}`}>
                                            {order.status} {order.stock_quantity > 0 && `(${order.stock_quantity} available)`}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            ${order.price.toFixed(2)} each
                                            {order.quantity > 0 && (
                                                <span className="ml-2 font-semibold text-[#00447C]">
                                                    = ${(order.quantity * order.price).toFixed(2)}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(order.id, -1)}
                                            disabled={order.quantity === 0}
                                            className="group p-1.5 rounded-md border border-gray-200 hover:border-[#00447C] hover:bg-[#00447C]/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus className="h-3.5 w-3.5 text-gray-600 group-hover:text-[#00447C]" />
                                        </button>

                                        <span className="w-8 text-center text-sm font-semibold text-gray-900">{order.quantity}</span>

                                        <button
                                            onClick={() => handleQuantityChange(order.id, 1)}
                                            className="group p-1.5 rounded-md bg-[#00447C] border border-[#00447C] hover:bg-[#003d6f] transition-all duration-200 shadow-sm"
                                        >
                                            <Plus className="h-3.5 w-3.5 text-white" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Estimated delivery */}
                <div className="flex items-center justify-center gap-2 mt-6 text-center">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <p className="text-xs text-gray-500 font-medium">Estimated Delivery: <span className="text-gray-700">March 18-20, 2026</span></p>
                </div>
            </main>

            {/* SKILL.md Designed Footer with CTA */}
            <footer className="fixed bottom-0 left-0 right-0 z-50">
                {/* Deep navy gradient base */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00447C] via-[#003d6f] to-[#00284a]"></div>

                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}></div>

                {/* Animated glow */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                {/* Content */}
                <div className="relative container px-4 py-4">
                    {/* Reorder button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleReorder}
                            disabled={isSubmitting || totalItems === 0}
                            className="group relative w-full max-w-xs h-11 rounded-xl bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                            {/* Content */}
                            <div className="relative flex items-center justify-center gap-2">
                                <ShoppingCart className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xs font-bold text-white tracking-wide">REORDER NOW</span>
                                <span className="text-[10px] text-white/70">({totalItems} items) - ${totalAmount.toFixed(2)}</span>
                            </div>
                        </button>
                    </div>

                    {/* Decorative pulse dot */}
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

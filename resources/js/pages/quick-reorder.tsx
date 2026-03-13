import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, HelpCircle, Plus, Minus, ShoppingCart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const frequentOrders = [
    {
        id: 1,
        name: 'Nestlé Milo Powder 3kg',
        status: 'In Stock: High',
        statusColor: 'text-emerald-600',
        quantity: 2,
        image: '📦',
    },
    {
        id: 2,
        name: 'Nestlé Pure Life Water 500ml',
        status: 'In Stock: Medium',
        statusColor: 'text-amber-600',
        quantity: 1,
        image: '💧',
    },
    {
        id: 3,
        name: 'Nestlé Coffee Mate 1.5kg',
        status: 'In Stock: Low',
        statusColor: 'text-red-600',
        quantity: 3,
        image: '☕',
    },
    {
        id: 4,
        name: 'Nestlé Cerelac Wheat 400g',
        status: 'In Stock: High',
        statusColor: 'text-emerald-600',
        quantity: 1,
        image: '🍼',
    },
    {
        id: 5,
        name: 'Nestlé KitKat Bar 45g',
        status: 'In Stock: High',
        statusColor: 'text-emerald-600',
        quantity: 5,
        image: '🍫',
    },
];

export default function QuickReorder() {
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
            <main className="container py-6 pb-32">
                {/* Frequent Orders Card */}
                <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-0">
                        {/* Card header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-[#00447C]" />
                                <h2 className="font-semibold text-gray-900">Frequent Orders</h2>
                            </div>
                            <span className="text-xs text-gray-500">{frequentOrders.length} items</span>
                        </div>
                        
                        {/* Order list */}
                        <div className="divide-y divide-gray-100">
                            {frequentOrders.map((order) => (
                                <div key={order.id} className="flex items-center gap-3 p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    {/* Product thumbnail */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center text-xl shadow-sm">
                                        {order.image}
                                    </div>
                                    
                                    {/* Product info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{order.name}</h3>
                                        <p className={`text-xs font-medium mt-0.5 ${order.statusColor}`}>{order.status}</p>
                                    </div>
                                    
                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2">
                                        <button className="group p-1.5 rounded-md border border-gray-200 hover:border-[#00447C] hover:bg-[#00447C]/5 transition-all duration-200">
                                            <Minus className="h-3.5 w-3.5 text-gray-600 group-hover:text-[#00447C]" />
                                        </button>
                                        
                                        <span className="w-8 text-center text-sm font-semibold text-gray-900">{order.quantity}</span>
                                        
                                        <button className="group p-1.5 rounded-md bg-[#00447C] border border-[#00447C] hover:bg-[#003d6f] transition-all duration-200 shadow-sm">
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
                    <button className="group relative w-full h-12 rounded-xl bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl overflow-hidden">
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        {/* Content */}
                        <div className="relative flex items-center justify-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-bold text-white tracking-wide">REORDER NOW</span>
                            <span className="text-xs text-white/70">({frequentOrders.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        </div>
                    </button>
                    
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

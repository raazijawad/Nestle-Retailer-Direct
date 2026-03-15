import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Filter, ChevronDown, Package, AlertTriangle, TrendingUp, TrendingDown, Eye, EyeOff, ChevronLeft, HelpCircle, LayoutDashboard, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
    stock_quantity: number;
}

interface Props {
    products: Product[];
    categories: string[];
}

function getStockStatusBadge(status: string): string {
    switch (status) {
        case 'in_stock':
            return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
        case 'low_stock':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
        case 'out_of_stock':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
}

function getStockStatusLabel(status: string): string {
    switch (status) {
        case 'in_stock':
            return 'In Stock';
        case 'low_stock':
            return 'Low Stock';
        case 'out_of_stock':
            return 'Out of Stock';
        default:
            return status;
    }
}

export default function Stock({ products, categories }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [stockFilter, setStockFilter] = useState<string>('all');
    const [showOutOfStock, setShowOutOfStock] = useState(true);

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesStockFilter = stockFilter === 'all' || product.stock_status === stockFilter;
            const shouldShowOutOfStock = showOutOfStock || product.stock_status !== 'out_of_stock';
            return matchesSearch && matchesCategory && matchesStockFilter && shouldShowOutOfStock;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price_low':
                    return a.price - b.price;
                case 'price_high':
                    return b.price - a.price;
                case 'stock_low':
                    return a.stock_quantity - b.stock_quantity;
                case 'stock_high':
                    return b.stock_quantity - a.stock_quantity;
                default:
                    return 0;
            }
        });

    const stats = {
        total_products: products.length,
        in_stock: products.filter(p => p.stock_status === 'in_stock').length,
        low_stock: products.filter(p => p.stock_status === 'low_stock').length,
        out_of_stock: products.filter(p => p.stock_status === 'out_of_stock').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e8ecf1]">
            <Head title="Inventory" />

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
                    <h1 className="text-base md:text-lg font-bold text-white tracking-widest uppercase">Inventory Snapshots</h1>

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
            <main className="container md:py-6 pb-24">
                <div className="flex flex-col gap-6">
                    {/* Page Title */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#00447C]">Inventory Snapshots</h1>
                        <p className="text-muted-foreground mt-1">View and manage product stock levels</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_products}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                                <TrendingUp className="h-4 w-4 text-emerald-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-emerald-600">{stats.in_stock}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-amber-600">{stats.low_stock}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{stats.out_of_stock}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Search and Filters */}
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full md:w-auto justify-between">
                                            {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                                            All Categories
                                        </DropdownMenuItem>
                                        {categories.map((category) => (
                                            <DropdownMenuItem
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                {category}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full md:w-auto justify-between">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Stock
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setStockFilter('all')}>
                                            All Stock Levels
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setStockFilter('in_stock')}>
                                            In Stock
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setStockFilter('low_stock')}>
                                            Low Stock
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setStockFilter('out_of_stock')}>
                                            Out of Stock
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full md:w-auto justify-between">
                                            Sort
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setSortBy('name')}>
                                            Name (A-Z)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('price_low')}>
                                            Price (Low to High)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('price_high')}>
                                            Price (High to Low)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('stock_low')}>
                                            Stock (Low to High)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('stock_high')}>
                                            Stock (High to Low)
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowOutOfStock(!showOutOfStock)}
                                    className="w-full md:w-auto"
                                >
                                    {showOutOfStock ? (
                                        <>
                                            <EyeOff className="h-4 w-4 mr-2" />
                                            Hide Out of Stock
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="h-4 w-4 mr-2" />
                                            Show All
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Count */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredProducts.length} of {products.length} products
                        </p>
                    </div>

                    {/* Products Table */}
                    {filteredProducts.length === 0 ? (
                        <Card className="border-0 shadow-lg">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Stock Level
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border border-border overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm">{product.name}</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                                                            {product.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-[#00447C]">
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                                                        <div
                                                            className={`h-full rounded-full ${
                                                                product.stock_status === 'in_stock'
                                                                    ? 'bg-emerald-500'
                                                                    : product.stock_status === 'low_stock'
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-red-500'
                                                            }`}
                                                            style={{
                                                                width: `${Math.min(100, (product.stock_quantity / 100) * 100)}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                {product.stock_quantity} units
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge className={getStockStatusBadge(product.stock_status)}>
                                                    {getStockStatusLabel(product.stock_status)}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    )}
                </div>
            </main>

            {/* SKILL.md Designed Footer */}
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
                    <div className="flex justify-center">
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="group relative flex flex-col items-center gap-1.5 p-2"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <Icon className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                        </div>
                                        <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">
                                            {link.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
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

const navLinks = [
    { name: 'Home', icon: LayoutDashboard, href: '/' },
    { name: 'Orders', icon: Package, href: '/dashboard/orders' },
    { name: 'Inventory', icon: Package, href: '/stock' },
    { name: 'Profile', icon: Settings, href: '/settings/profile' },
];

import { Head, usePage } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    AlertTriangle,
    Package,
    ShoppingCart,
    Percent,
    User,
    Search,
    ChevronRight,
    LayoutDashboard,
    TrendingUp,
    Clock,
    CheckCircle,
} from 'lucide-react';

const colorPalette = [
    { name: 'Deep Navy Blue', hex: '#00447C', usage: 'Primary headers/sidebars' },
    { name: 'White', hex: '#FFFFFF', usage: 'Background' },
    { name: 'Alert Yellow', hex: '#F8B803', usage: 'Alerts and warnings' },
    { name: 'Text Dark', hex: '#1B1B1B', usage: 'Primary text' },
    { name: 'Light Gray', hex: '#FDFDFC', usage: 'Secondary background' },
];

const typographyInfo = [
    { name: 'Primary Font', value: 'Lato / Roboto', type: 'Sans-serif' },
    { name: 'Fallback', value: 'Instrument Sans', type: 'System' },
];

const layoutSections = [
    {
        area: 'Left Sidebar',
        percentage: '20%',
        content: 'Navigation (Home, Orders, Inventory, Promotions, Settings)',
        icon: LayoutDashboard,
    },
    {
        area: 'Top Bar',
        percentage: '10%',
        content: 'Header with Search and User Profile',
        icon: User,
    },
    {
        area: 'Main Content',
        percentage: '70%',
        content: 'Dashboard grid with alerts, stats, and panels',
        icon: LayoutDashboard,
    },
];

const dashboardRows = [
    {
        row: 'Row 1',
        content: 'High-priority Alerts (Low stock warnings)',
        priority: 'High',
    },
    {
        row: 'Row 2',
        content: '3-column grid of Quick Stats',
        stats: ['Total Orders', 'Inventory Value', 'Pending Tasks'],
    },
    {
        row: 'Row 3',
        content: 'Two large panels',
        panels: ['Recent Orders (Left)', 'Inventory Management (Right)'],
    },
];

const featureComparison = [
    {
        feature: 'One-Tap Reorder',
        mobile: 'Single Button',
        desktop: 'Quick-Action Widget showing last 3 orders with "Reorder" button',
        icon: ShoppingCart,
    },
    {
        feature: 'Inventory Snapshot',
        mobile: 'Single Button',
        desktop: 'Mini-Table showing top 5 moving items and current stock levels',
        icon: Package,
    },
    {
        feature: 'My Orders',
        mobile: 'Single Button',
        desktop: 'Summary List of Active Orders with status trackers',
        icon: Clock,
    },
    {
        feature: 'Promotions',
        mobile: 'Single Button',
        desktop: 'Visual Carousel or sidebar highlights of active discounts',
        icon: Percent,
    },
];

const navigationItems = [
    { name: 'Home', icon: LayoutDashboard, description: 'Dashboard overview' },
    { name: 'Orders', icon: ShoppingCart, description: 'Order management' },
    { name: 'Inventory', icon: Package, description: 'Stock tracking' },
    { name: 'Promotions', icon: Percent, description: 'Active discounts' },
    { name: 'Account Settings', icon: User, description: 'Profile configuration' },
];

const cardStyles = {
    shadow: 'subtle drop shadows',
    corners: '8px–12px rounded corners',
    feel: 'app-like modern feel',
};

export default function NestleSystemAnalysis({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <GuestLayout canRegister={canRegister}>
            <Head title="Nestlé System Analysis" />
            <div className="flex flex-col gap-6">
            


                {/* Layout Structure */}
                    <Card className="lg:col-span-3">
                        
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {layoutSections.map((section) => (
                                    <div
                                        key={section.area}
                                        className="flex flex-col items-center rounded-lg border bg-muted/50 p-4 text-center"
                                    >
                                        <section.icon className="mb-2 h-8 w-8 text-primary" />
                                        <Badge className="mb-2" variant="outline">
                                            {section.percentage}
                                        </Badge>
                                        <p className="font-medium">{section.area}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

            

            


            </div>
        </GuestLayout>
    );
}

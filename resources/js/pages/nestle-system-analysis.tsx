import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import {
    ShoppingCart,
    Package,
    Clock,
} from 'lucide-react';

const layoutSections = [
    {
        area: 'One-Tap Reorder',
        percentage: '20%',
        content: 'Quick-action widget with last 3 orders and "Reorder" button',
        icon: ShoppingCart,
    },
    {
        area: 'Inventory Snapshots',
        percentage: '10%',
        content: 'Mini-table showing top 5 moving items and stock levels',
        icon: Package,
    },
    {
        area: 'My Orders',
        percentage: '70%',
        content: 'Summary list of active orders with status trackers',
        icon: Clock,
    },
];

export default function NestleSystemAnalysis({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <GuestLayout canRegister={canRegister}>
            <Head title="Nestlé System Analysis" />
            <div className="flex min-h-screen flex-col gap-6 bg-blue-50 px-4 md:px-8 lg:px-16 dark:bg-blue-950">
                

                {/* Layout Structure */}
                <div className="grid gap-4 md:grid-cols-3 mt-8">
                    {layoutSections.map((section) => (
                        <div
                            key={section.area}
                            className="flex flex-col items-center rounded-xl p-4 text-center shadow-lg backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10"
                        >
                            <section.icon className="mb-2 h-6 w-6 text-primary" />
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
            </div>
        </GuestLayout>
    );
}

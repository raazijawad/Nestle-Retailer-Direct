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
            <div className="flex flex-col gap-6">
                

                {/* Layout Structure */}
                <div className="grid gap-4 md:grid-cols-3">
                    {layoutSections.map((section) => (
                        <div
                            key={section.area}
                            className="flex flex-col items-center rounded-xl p-6 text-center shadow-lg backdrop-blur-sm bg-background/40 border border-white/10"
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
            </div>
        </GuestLayout>
    );
}

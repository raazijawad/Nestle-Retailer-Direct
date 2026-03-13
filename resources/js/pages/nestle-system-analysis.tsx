import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    ShoppingCart,
    Package,
    Clock,
} from 'lucide-react';

const layoutSections = [
    {
        area: 'One-Tap Reorder',
        icon: ShoppingCart,
    },
    {
        area: 'Inventory Snapshots',
        icon: Package,
    },
    {
        area: 'My Orders',
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
                            className="flex flex-col items-center rounded-xl p-6 text-center shadow-lg backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10"
                        >
                            <section.icon className="mb-2 h-8 w-8 text-primary" />
                            <p className="font-medium">{section.area}</p>
                        </div>
                    ))}
                </div>

                {/* In Progress Cards */}
                <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="flex flex-col items-center rounded-xl p-6 text-center shadow-lg backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10 opacity-50">
                        <p className="font-medium text-muted-foreground">Coming Soon</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl p-6 text-center shadow-lg backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10 opacity-50">
                        <p className="font-medium text-muted-foreground">Coming Soon</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl p-6 text-center shadow-lg backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10 opacity-50">
                        <p className="font-medium text-muted-foreground">Coming Soon</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

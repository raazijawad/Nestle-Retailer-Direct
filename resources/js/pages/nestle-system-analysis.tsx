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
            <div className="flex h-full flex-col items-center justify-center bg-blue-50 dark:bg-blue-950">
                {/* Cards Container */}
                <div className="flex flex-col gap-10 py-8">
                    {/* Row 1 */}
                    <div className="grid gap-10 md:grid-cols-3">
                        {layoutSections.map((section) => (
                            <div
                                key={section.area}
                                className="flex h-56 w-72 flex-col items-center justify-center rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm border border-white/50 dark:bg-white/10"
                            >
                                <section.icon className="mb-4 h-14 w-14 text-primary" />
                                <p className="font-medium text-xl">{section.area}</p>
                            </div>
                        ))}
                    </div>

                    {/* Row 2 - In Progress */}
                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="flex h-56 w-72 flex-col items-center justify-center rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm border border-white/50 dark:bg-white/10 opacity-50">
                            <p className="font-medium text-xl text-muted-foreground">Coming Soon</p>
                        </div>
                        <div className="flex h-56 w-72 flex-col items-center justify-center rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm border border-white/50 dark:bg-white/10 opacity-50">
                            <p className="font-medium text-xl text-muted-foreground">Coming Soon</p>
                        </div>
                        <div className="flex h-56 w-72 flex-col items-center justify-center rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm border border-white/50 dark:bg-white/10 opacity-50">
                            <p className="font-medium text-xl text-muted-foreground">Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

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
            <div className="flex h-full flex-col gap-4 bg-blue-50 px-8 md:px-16 lg:px-32 dark:bg-blue-950">
                    

                {/* Cards Container */}
                <div className="flex flex-1 flex-col justify-center gap-4 min-h-0">
                    {/* Row 1 */}
                    <div className="grid gap-4 md:grid-cols-3 flex-1 min-h-0">
                        {layoutSections.map((section) => (
                            <div
                                key={section.area}
                                className="flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10"
                            >
                                <section.icon className="mb-3 h-12 w-12 text-primary" />
                                <p className="font-semibold text-lg">{section.area}</p>
                            </div>
                        ))}
                    </div>

                    {/* Row 2 - In Progress */}
                    <div className="grid gap-4 md:grid-cols-3 flex-1 min-h-0">
                        <div className="flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10 opacity-50">
                            <p className="font-semibold text-lg text-muted-foreground">Coming Soon</p>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10 opacity-50">
                            <p className="font-semibold text-lg text-muted-foreground">Coming Soon</p>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm bg-white/90 border border-white/50 dark:bg-white/10 opacity-50">
                            <p className="font-semibold text-lg text-muted-foreground">Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

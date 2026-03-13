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
        href: '/dashboard/orders',
    },
    {
        area: 'Inventory Snapshots',
        icon: Package,
        href: '/dashboard/inventory',
    },
    {
        area: 'My Orders',
        icon: Clock,
        href: '/dashboard/orders',
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
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-slate-900 dark:to-blue-900">
                {/* Cards Container */}
                <div className="flex flex-col gap-10 py-8">
                    {/* Row 1 */}
                    <div className="grid gap-10 md:grid-cols-3">
                        {layoutSections.map((section) => (
                            <a
                                key={section.area}
                                href={section.href}
                                className="group flex h-56 w-72 flex-col items-center justify-center rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm border border-white/50 dark:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-white cursor-pointer"
                            >
                                <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                                    <section.icon className="mb-4 h-14 w-14 text-primary" />
                                </div>
                                <p className="font-medium text-xl group-hover:text-primary/80 transition-colors duration-300">{section.area}</p>
                                <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        Click to view
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </a>
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

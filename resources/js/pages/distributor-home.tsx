import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import {
    ClipboardList,
    Warehouse,
    Truck,
    BarChart3,
    MapPin,
    PackageSearch,
    Users,
    Bell,
} from 'lucide-react';

const distributorSections = [
    {
        area: 'Retailer Orders',
        icon: ClipboardList,
        href: '/distributor/incoming-orders',
        description: 'View incoming orders',
        color: 'from-blue-500 to-blue-600',
    },
    {
        area: 'Warehouse Inventory',
        icon: Warehouse,
        href: '/distributor/warehouse-inventory',
        description: 'Manage stock levels',
        color: 'from-emerald-500 to-emerald-600',
    },
    {
        area: 'Delivery Tracking',
        icon: Truck,
        href: '/distributor/delivery',
        description: 'Track shipments',
        color: 'from-amber-500 to-amber-600',
    },
    {
        area: 'Order Statistics',
        icon: BarChart3,
        href: '/distributor/statistics',
        description: 'View performance',
        color: 'from-purple-500 to-purple-600',
    },
    {
        area: 'Delivery Schedule',
        icon: MapPin,
        href: '/distributor/schedule',
        description: 'Manage schedules',
        color: 'from-pink-500 to-pink-600',
    },
    {
        area: 'Retailer Management',
        icon: Users,
        href: '/distributor/retailers',
        description: 'Manage retailers',
        color: 'from-cyan-500 to-cyan-600',
    },
    {
        area: 'Tracking Dashboard',
        icon: PackageSearch,
        href: '/distributor/dashboard',
        description: 'Full tracking view',
        color: 'from-indigo-500 to-indigo-600',
    },
    {
        area: 'Notifications',
        icon: Bell,
        href: '/distributor/notifications',
        description: 'View alerts',
        color: 'from-orange-500 to-orange-600',
    },
];

interface Props {
    name: string;
    companyName: string;
}

export default function DistributorHome({ name, companyName }: Props) {
    return (
        <GuestLayout>
            <Head title="Distributor Dashboard" />
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#00447C] via-[#003d6f] to-[#00284a]">
                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}></div>

                {/* Animated glow orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Header */}
                <div className="relative z-10 text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">DISTRIBUTOR PORTAL</h1>
                    <p className="text-white/70 text-sm md:text-base">{companyName} • {name}</p>
                </div>

                {/* Cards Container */}
                <div className="relative z-10 flex flex-col justify-center gap-4 md:gap-6 py-4 md:py-8">
                    {/* Mobile Layout - 2 columns */}
                    <div className="grid grid-cols-2 gap-3 md:hidden">
                        {distributorSections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <Link
                                    key={section.area}
                                    href={section.href}
                                    className="group flex flex-col items-center justify-center rounded-xl bg-white/10 p-3 text-center shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl hover:border-white/30 cursor-pointer"
                                >
                                    <div className={`transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 rounded-lg bg-gradient-to-br ${section.color} p-2`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <p className="font-medium text-xs text-white mt-2 text-center">{section.area}</p>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Layout - 4 columns x 2 rows */}
                    <div className="hidden md:grid grid-cols-4 gap-4">
                        {distributorSections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <Link
                                    key={section.area}
                                    href={section.href}
                                    className="group flex h-36 w-44 flex-col items-center justify-center rounded-2xl bg-white/10 p-5 text-center shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,100,255,0.3)] hover:border-white/30 cursor-pointer"
                                >
                                    <div className={`transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 rounded-xl bg-gradient-to-br ${section.color} p-3 shadow-lg`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <p className="font-medium text-sm text-white mt-3">{section.area}</p>
                                    <p className="text-xs text-white/60 mt-1">{section.description}</p>
                                    <div className="mt-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <span className="text-xs text-white/80 flex items-center gap-1 justify-center">
                                            Click to view
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-8 text-center">
                    <p className="text-white/50 text-xs">© 2026 Nestlé OMS - Distributor Portal. All rights reserved.</p>
                </div>
            </div>
        </GuestLayout>
    );
}

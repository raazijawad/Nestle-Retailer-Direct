import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogIn, UserPlus, Home, Package, ShoppingCart, Settings, User, LogOut } from 'lucide-react';

const navLinks = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Orders', icon: ShoppingCart, href: '/dashboard' },
    { name: 'Inventory', icon: Package, href: '/dashboard' },
    { name: 'Profile', icon: Settings, href: '/dashboard' },
];

export default function GuestLayout({
    children,
    canRegister = true,
}: {
    children: React.ReactNode;
    canRegister?: boolean;
}) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
    const isLoggedIn = !!auth?.user;

    return (
        <div className="flex h-screen flex-col bg-transparent overflow-hidden">
            {/* SKILL.md Designed Navbar - Refined Minimalism */}
            <header className="sticky top-0 z-50 w-full">
                {/* Deep navy gradient base */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00447C] via-[#003d6f] to-[#00284a]"></div>
                
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}></div>
                
                {/* Animated glow orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/3 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Content */}
                <div className="relative container flex h-20 md:h-16 items-center justify-between px-4">
                    {/* Logo section */}
                    <div className="flex items-center gap-3">
                        {/* Icon with glow container */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                <LayoutDashboard className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        
                        {/* Brand text */}
                        <div className="flex flex-col">
                            <span className="text-xs md:text-lg font-bold text-white tracking-tight">Nestlé Retailer Direct</span>
                            <span className="text-[9px] text-white/50 font-medium tracking-widest uppercase">System Analysis</span>
                        </div>
                    </div>
                    
                    {/* Navigation buttons - Desktop */}
                    <nav className="hidden md:flex items-center gap-2">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-300">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                        
                        {isLoggedIn ? (
                            <>
                                {/* User profile button */}
                                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10 border border-white/20 transition-all duration-300">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/10 border border-white/30 flex items-center justify-center">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium">{auth.user?.name || 'User'}</span>
                                </Button>
                                <Link href="/logout">
                                    <Button variant="ghost" className="text-white/70 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-300">
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-300">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                    
                    {/* Mobile - User icon or Log in button */}
                    <div className="flex md:hidden">
                        {isLoggedIn ? (
                            <Link href="/profile">
                                <Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-300">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" className="text-white hover:bg-white/10 transition-all duration-300">
                                    <LogIn className="h-5 w-5" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container overflow-hidden pb-24">{children}</main>

            {/* SKILL.md Designed Footer - Refined Minimalism */}
            <footer className="fixed bottom-0 left-0 right-0 z-50">
                {/* Deep navy gradient base */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00447C] via-[#003d6f] to-[#00284a]"></div>
                
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}></div>
                
                {/* Animated glow orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl"></div>
                </div>
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
                {/* Content */}
                <div className="relative container px-4 py-3">
                    <div className="flex items-center justify-center">
                        {/* Navigation */}
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group relative flex flex-col items-center gap-1.5 p-2"
                                >
                                    {/* Icon container with glow effect */}
                                    <div className="relative">
                                        {/* Glow background on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Icon */}
                                        <link.icon className="relative h-5 w-5 text-white/60 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                    </div>
                                    
                                    {/* Label */}
                                    <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase group-hover:text-white/80 transition-colors duration-500">
                                        {link.name}
                                    </span>
                                    
                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-8 transition-all duration-500"></div>
                                </Link>
                            ))}
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

import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogIn, UserPlus, Home, Package, ShoppingCart, Settings } from 'lucide-react';

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
    return (
        <div className="flex min-h-screen flex-col bg-transparent">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6" />
                        <span className="font-bold">Nestlé Retailer Direct</span>
                    </div>
                    <nav className="flex items-center gap-2">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                <LogIn className="mr-2 h-4 w-4" />
                                Log in
                            </Button>
                        </Link>
                        {canRegister && (
                            <Link href="/register">
                                <Button size="sm">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Register
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container pb-20">{children}</main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
                <div className="container px-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="grid w-full max-w-md grid-cols-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex flex-col items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

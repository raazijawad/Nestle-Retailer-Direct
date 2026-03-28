import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Store, Building2, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Approvals',
        href: '/dashboard/user-approvals',
    },
];

interface Profile {
    id: number;
    shop_name?: string;
    company_name?: string;
    shop_address?: string;
    company_address?: string;
    shop_city?: string;
    company_city?: string;
    shop_phone?: string;
    company_phone?: string;
}

interface PendingUser {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    profile: Profile | null;
}

interface Props {
    pendingUsers: PendingUser[];
}

export default function UserApprovalsPage({ pendingUsers }: Props) {
    const { flash } = usePage().props;

    const handleApprove = (userId: number) => {
        router.post(`/dashboard/user-approvals/${userId}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const handleReject = (userId: number) => {
        router.post(`/dashboard/user-approvals/${userId}/reject`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Approvals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">User Approvals</h1>
                        <p className="text-muted-foreground mt-1">Review and approve new user registrations</p>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 border border-green-200">
                        <p className="text-sm text-green-800">{flash.success}</p>
                    </div>
                )}
                {flash?.error && (
                    <div className="rounded-md bg-red-50 p-4 border border-red-200">
                        <p className="text-sm text-red-800">{flash.error}</p>
                    </div>
                )}

                {/* Pending Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>
                            {pendingUsers.length} {pendingUsers.length === 1 ? 'user' : 'users'} waiting for approval
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingUsers.length === 0 ? (
                            <div className="text-center py-12">
                                <User className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">No pending approvals</h3>
                                <p className="text-muted-foreground mt-1">
                                    All user accounts have been reviewed
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4"
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                {user.role === 'retailer' ? (
                                                    <Store className="h-6 w-6 text-primary" />
                                                ) : (
                                                    <Building2 className="h-6 w-6 text-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{user.name}</h3>
                                                    <Badge variant={user.role === 'retailer' ? 'default' : 'secondary'}>
                                                        {user.role}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Registered {user.created_at}
                                                </p>
                                                {user.profile && (
                                                    <div className="mt-2 text-sm">
                                                        {user.role === 'retailer' && user.profile.shop_name && (
                                                            <p className="flex items-center gap-1">
                                                                <Store className="h-3 w-3" />
                                                                {user.profile.shop_name}
                                                            </p>
                                                        )}
                                                        {user.role === 'distributor' && user.profile.company_name && (
                                                            <p className="flex items-center gap-1">
                                                                <Building2 className="h-3 w-3" />
                                                                {user.profile.company_name}
                                                            </p>
                                                        )}
                                                        {user.profile.shop_city || user.profile.company_city ? (
                                                            <p className="text-muted-foreground">
                                                                {user.profile.shop_city || user.profile.company_city}
                                                            </p>
                                                        ) : null}
                                                        {user.profile.shop_phone || user.profile.company_phone ? (
                                                            <p className="text-muted-foreground">
                                                                {user.profile.shop_phone || user.profile.company_phone}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleReject(user.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Reject
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => handleApprove(user.id)}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <Check className="h-4 w-4 mr-1" />
                                                Approve
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

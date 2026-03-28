<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserApprovalsController extends Controller
{
    /**
     * Display pending user approvals.
     */
    public function index()
    {
        $pendingUsers = User::where('approval_status', 'pending')
            ->with(['shopProfile', 'distributorProfile'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'created_at' => $user->created_at->diffForHumans(),
                    'profile' => $user->role === 'retailer' ? $user->shopProfile : $user->distributorProfile,
                ];
            });

        return Inertia::render('dashboard/user-approvals', [
            'pendingUsers' => $pendingUsers,
        ]);
    }

    /**
     * Approve a pending user.
     */
    public function approve(User $user)
    {
        if ($user->approval_status !== 'pending') {
            return back()->with('error', 'User is not pending approval.');
        }

        $user->update([
            'approval_status' => 'approved',
            'approved_at' => now(),
            'approved_by' => Auth::id(),
        ]);

        return back()->with('success', 'User approved successfully.');
    }

    /**
     * Reject a pending user.
     */
    public function reject(User $user)
    {
        if ($user->approval_status !== 'pending') {
            return back()->with('error', 'User is not pending approval.');
        }

        $user->update([
            'approval_status' => 'rejected',
            'approved_at' => now(),
            'approved_by' => Auth::id(),
        ]);

        return back()->with('success', 'User rejected successfully.');
    }
}

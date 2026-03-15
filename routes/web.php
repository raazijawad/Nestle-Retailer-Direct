<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;
use App\Http\Controllers\Dashboard\AccountsController;
use App\Http\Controllers\OrderController;

Route::inertia('/', 'nestle-system-analysis', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/quick-reorder', 'quick-reorder')->name('quick-reorder')->middleware(['auth']);

// Logout route (GET for link, POST for form)
Route::get('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
});

// Re-login page for non-admin users
Route::middleware(['auth'])->get('/re-login', function () {
    return inertia('re-login');
})->name('re-login');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard/accounts', [AccountsController::class, 'index'])->name('dashboard.accounts');
    Route::get('dashboard/orders', [OrderController::class, 'index'])->name('dashboard.orders');
    Route::post('dashboard/orders/{order}/approve', [OrderController::class, 'approve'])->name('dashboard.orders.approve');
    Route::post('dashboard/orders/{order}/reject', [OrderController::class, 'reject'])->name('dashboard.orders.reject');
});

Route::middleware(['auth'])->post('/orders', [OrderController::class, 'store'])->name('orders.store');

require __DIR__.'/settings.php';

<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;
use App\Http\Controllers\Dashboard\AccountsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DistributorController;

// Home route - redirects based on user role
Route::get('/', function () {
    if (Auth::check()) {
        if (Auth::user()->isDistributor()) {
            return redirect()->route('distributor.home');
        }
        // Add retailer redirect here if needed
    }
    return inertia('nestle-system-analysis', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Distributor routes
Route::middleware(['auth', 'verified', 'distributor'])->group(function () {
    Route::get('/distributor/home', [DistributorController::class, 'home'])->name('distributor.home');
    Route::get('/distributor/orders', [DistributorController::class, 'orders'])->name('distributor.orders');
    Route::post('/distributor/orders/{order}/approve', [DistributorController::class, 'approveOrder'])->name('distributor.orders.approve');
    Route::post('/distributor/orders/{order}/reject', [DistributorController::class, 'rejectOrder'])->name('distributor.orders.reject');
    Route::post('/distributor/orders/{order}/status', [DistributorController::class, 'updateOrderStatus'])->name('distributor.orders.status');
    Route::get('/distributor/delivery', [DistributorController::class, 'delivery'])->name('distributor.delivery');
    Route::get('/distributor/statistics', [DistributorController::class, 'statistics'])->name('distributor.statistics');
    Route::get('/distributor/schedule', [DistributorController::class, 'schedule'])->name('distributor.schedule');
    Route::get('/distributor/retailers', [DistributorController::class, 'retailers'])->name('distributor.retailers');
    Route::get('/distributor/dashboard', [DistributorController::class, 'dashboard'])->name('distributor.dashboard');
    Route::get('/distributor/notifications', [DistributorController::class, 'notifications'])->name('distributor.notifications');
});

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

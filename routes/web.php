<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'nestle-system-analysis', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/quick-reorder', 'quick-reorder')->name('quick-reorder');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

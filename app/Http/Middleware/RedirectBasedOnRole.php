<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            $currentRoute = $request->route()->getName();
            
            // If user is trying to access the home route, redirect based on role
            if ($currentRoute === 'home') {
                if ($user->isDistributor()) {
                    return redirect()->route('distributor.home');
                }
                
                if ($user->isAdmin()) {
                    return redirect()->route('dashboard');
                }
                
                // Retailers and regular users stay on home (nestle-system-analysis page)
            }
        }
        
        return $next($request);
    }
}

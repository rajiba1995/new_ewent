<?php


use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\SanctumAuthMiddleware; // Import your middleware
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
  ->withRouting(
    web: __DIR__.'/../routes/web.php',
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
  )
  ->withMiddleware(function (Middleware $middleware) {
      $middleware->alias([
          'auth.sanctum.custom' => SanctumAuthMiddleware::class, // Register custom middleware
          'auth.sanctum' => EnsureFrontendRequestsAreStateful::class,
          'check.permission' => \App\Http\Middleware\CheckPermission::class, // Correctly added here
      ]);
  })
  ->withExceptions(function (Exceptions $exceptions) {
    //
  })->create();


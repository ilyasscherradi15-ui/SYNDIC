<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResidenceController;
use App\Http\Controllers\Api\ImmeubleController;
use App\Http\Controllers\Api\ProprietaireController;
use App\Http\Controllers\Api\LogementController;
use App\Http\Controllers\Api\OccupantController;
use App\Http\Controllers\Api\CotisationController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\DepenseController;
use App\Http\Controllers\Api\DocumentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Routes publiques (pas besoin d'être connecté)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées (nécessitent un token valide)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Lecture accessible à tous les utilisateurs connectés
    Route::apiResource('residences', ResidenceController::class)->only(['index', 'show']);
    Route::apiResource('immeubles', ImmeubleController::class)->only(['index', 'show']);
    Route::apiResource('proprietaires', ProprietaireController::class)->only(['index', 'show']);
    Route::apiResource('logements', LogementController::class)->only(['index', 'show']);
    Route::apiResource('occupants', OccupantController::class)->only(['index', 'show']);
    Route::apiResource('cotisations', CotisationController::class)->only(['index', 'show']);
    Route::apiResource('paiements', PaiementController::class)->only(['index', 'show']);
    Route::apiResource('depenses', DepenseController::class)->only(['index', 'show']);
    Route::apiResource('documents', DocumentController::class)->only(['index', 'show']);

    // Écriture réservée à admin/syndic
    Route::middleware('role:admin,syndic')->group(function () {
        Route::apiResource('residences', ResidenceController::class)->except(['index', 'show']);
        Route::apiResource('immeubles', ImmeubleController::class)->except(['index', 'show']);
        Route::apiResource('proprietaires', ProprietaireController::class)->except(['index', 'show']);
        Route::apiResource('logements', LogementController::class)->except(['index', 'show']);
        Route::apiResource('occupants', OccupantController::class)->except(['index', 'show']);
        Route::apiResource('cotisations', CotisationController::class)->except(['index', 'show']);
        Route::apiResource('paiements', PaiementController::class)->except(['index', 'show']);
        Route::apiResource('depenses', DepenseController::class)->except(['index', 'show']);
        Route::apiResource('documents', DocumentController::class)->except(['index', 'show']);
    });
});

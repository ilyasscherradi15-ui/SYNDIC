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
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('residences', ResidenceController::class);
    Route::apiResource('immeubles', ImmeubleController::class);
    Route::apiResource('proprietaires', ProprietaireController::class);
    Route::apiResource('logements', LogementController::class);
    Route::apiResource('occupants', OccupantController::class);
    Route::apiResource('cotisations', CotisationController::class);
    Route::apiResource('paiements', PaiementController::class);
    Route::apiResource('depenses', DepenseController::class);
    Route::apiResource('documents', DocumentController::class);
});

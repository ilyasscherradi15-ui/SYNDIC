<?php
use App\Http\Controllers\Api\LogementController;
use App\Http\Controllers\Api\ProprietaireController;
use App\Http\Controllers\Api\ImmeubleController;
use App\Http\Controllers\Api\ResidenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('residences', ResidenceController::class);
Route::apiResource('immeubles', ImmeubleController::class);
Route::apiResource('proprietaires', ProprietaireController::class);
Route::apiResource('logements', LogementController::class);

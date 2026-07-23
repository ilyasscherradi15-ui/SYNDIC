<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cotisation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CotisationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Cotisation::with('logement')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:mensuelle,trimestrielle,annuelle,exceptionnelle',
            'montant' => 'required|numeric|min:0',
            'date_echeance' => 'required|date',
            'statut' => 'sometimes|in:payee,partielle,retard,non_payee',
            'logement_id' => 'required|exists:logements,id',
        ]);

        $cotisation = Cotisation::create($validated);

        return response()->json($cotisation->load('logement'), 201);
    }

    public function show(Cotisation $cotisation): JsonResponse
    {
        return response()->json($cotisation->load('logement', 'paiements'));
    }

    public function update(Request $request, Cotisation $cotisation): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'sometimes|in:mensuelle,trimestrielle,annuelle,exceptionnelle',
            'montant' => 'sometimes|numeric|min:0',
            'date_echeance' => 'sometimes|date',
            'statut' => 'sometimes|in:payee,partielle,retard,non_payee',
            'logement_id' => 'sometimes|exists:logements,id',
        ]);

        $cotisation->update($validated);

        return response()->json($cotisation->load('logement'));
    }

    public function destroy(Cotisation $cotisation): JsonResponse
    {
        $cotisation->delete();

        return response()->json(null, 204);
    }
}

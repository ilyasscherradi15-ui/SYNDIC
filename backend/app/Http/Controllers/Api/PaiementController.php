<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Paiement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaiementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Paiement::with('cotisation')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:0',
            'date_paiement' => 'sometimes|date',
            'moyen_paiement' => 'nullable|string|max:50',
            'cotisation_id' => 'required|exists:cotisations,id',
        ]);

        $paiement = Paiement::create($validated);

        // Met à jour automatiquement le statut de la cotisation liée
        $cotisation = $paiement->cotisation;
        $totalPaye = $cotisation->paiements()->sum('montant');

        if ($totalPaye >= $cotisation->montant) {
            $cotisation->update(['statut' => 'payee']);
        } elseif ($totalPaye > 0) {
            $cotisation->update(['statut' => 'partielle']);
        }

        return response()->json($paiement->load('cotisation'), 201);
    }

    public function show(Paiement $paiement): JsonResponse
    {
        return response()->json($paiement->load('cotisation'));
    }

    public function update(Request $request, Paiement $paiement): JsonResponse
    {
        $validated = $request->validate([
            'montant' => 'sometimes|numeric|min:0',
            'date_paiement' => 'sometimes|date',
            'moyen_paiement' => 'nullable|string|max:50',
            'cotisation_id' => 'sometimes|exists:cotisations,id',
        ]);

        $paiement->update($validated);

        return response()->json($paiement->load('cotisation'));
    }

    public function destroy(Paiement $paiement): JsonResponse
    {
        $paiement->delete();

        return response()->json(null, 204);
    }
}

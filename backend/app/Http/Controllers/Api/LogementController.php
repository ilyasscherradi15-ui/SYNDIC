<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Logement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LogementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Logement::with(['residence', 'immeuble', 'proprietaire'])->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'numero' => 'required|string|max:50',
            'type' => 'required|in:appartement,villa,duplex,bungalow',
            'surface' => 'nullable|numeric|min:0',
            'quote_part' => 'required|numeric|min:0|max:100',
            'statut' => 'required|in:occupe,vacant',
            'residence_id' => 'required|exists:residences,id',
            'immeuble_id' => 'nullable|exists:immeubles,id',
            'proprietaire_id' => 'required|exists:proprietaires,id',
        ]);

        $logement = Logement::create($validated);

        return response()->json($logement->load(['residence', 'immeuble', 'proprietaire']), 201);
    }

    public function show(Logement $logement): JsonResponse
    {
        return response()->json(
            $logement->load(['residence', 'immeuble', 'proprietaire', 'occupants', 'cotisations'])
        );
    }

    public function update(Request $request, Logement $logement): JsonResponse
    {
        $validated = $request->validate([
            'numero' => 'sometimes|string|max:50',
            'type' => 'sometimes|in:appartement,villa,duplex,bungalow',
            'surface' => 'nullable|numeric|min:0',
            'quote_part' => 'sometimes|numeric|min:0|max:100',
            'statut' => 'sometimes|in:occupe,vacant',
            'residence_id' => 'sometimes|exists:residences,id',
            'immeuble_id' => 'nullable|exists:immeubles,id',
            'proprietaire_id' => 'sometimes|exists:proprietaires,id',
        ]);

        $logement->update($validated);

        return response()->json($logement->load(['residence', 'immeuble', 'proprietaire']));
    }

    public function destroy(Logement $logement): JsonResponse
    {
        $logement->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Occupant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OccupantController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Occupant::with('logement')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'date_entree' => 'required|date',
            'date_sortie' => 'nullable|date|after:date_entree',
            'logement_id' => 'required|exists:logements,id',
        ]);

        $occupant = Occupant::create($validated);

        return response()->json($occupant->load('logement'), 201);
    }

    public function show(Occupant $occupant): JsonResponse
    {
        return response()->json($occupant->load('logement'));
    }

    public function update(Request $request, Occupant $occupant): JsonResponse
    {
        $validated = $request->validate([
            'nom_complet' => 'sometimes|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'date_entree' => 'sometimes|date',
            'date_sortie' => 'nullable|date|after:date_entree',
            'logement_id' => 'sometimes|exists:logements,id',
        ]);

        $occupant->update($validated);

        return response()->json($occupant->load('logement'));
    }

    public function destroy(Occupant $occupant): JsonResponse
    {
        $occupant->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Depense;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DepenseController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Depense::with('residence')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date_depense' => 'required|date',
            'categorie' => 'required|in:gardiennage,nettoyage,eau,electricite,jardinage,piscine,maintenance,reparations,assurance,autres',
            'description' => 'nullable|string',
            'fournisseur' => 'nullable|string|max:255',
            'montant' => 'required|numeric|min:0',
            'residence_id' => 'required|exists:residences,id',
        ]);

        $depense = Depense::create($validated);

        return response()->json($depense->load('residence'), 201);
    }

    public function show(Depense $depense): JsonResponse
    {
        return response()->json($depense->load('residence', 'documents'));
    }

    public function update(Request $request, Depense $depense): JsonResponse
    {
        $validated = $request->validate([
            'date_depense' => 'sometimes|date',
            'categorie' => 'sometimes|in:gardiennage,nettoyage,eau,electricite,jardinage,piscine,maintenance,reparations,assurance,autres',
            'description' => 'nullable|string',
            'fournisseur' => 'nullable|string|max:255',
            'montant' => 'sometimes|numeric|min:0',
            'residence_id' => 'sometimes|exists:residences,id',
        ]);

        $depense->update($validated);

        return response()->json($depense->load('residence'));
    }

    public function destroy(Depense $depense): JsonResponse
    {
        $depense->delete();

        return response()->json(null, 204);
    }
}

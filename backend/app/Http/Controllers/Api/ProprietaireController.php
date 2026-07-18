<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proprietaire;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProprietaireController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Proprietaire::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'cin' => 'required|string|max:50|unique:proprietaires,cin',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'adresse' => 'nullable|string|max:255',
        ]);

        $proprietaire = Proprietaire::create($validated);

        return response()->json($proprietaire, 201);
    }

    public function show(Proprietaire $proprietaire): JsonResponse
    {
        return response()->json($proprietaire->load('logements'));
    }

    public function update(Request $request, Proprietaire $proprietaire): JsonResponse
    {
        $validated = $request->validate([
            'nom_complet' => 'sometimes|string|max:255',
            'cin' => 'sometimes|string|max:50|unique:proprietaires,cin,' . $proprietaire->id,
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'adresse' => 'nullable|string|max:255',
        ]);

        $proprietaire->update($validated);

        return response()->json($proprietaire);
    }

    public function destroy(Proprietaire $proprietaire): JsonResponse
    {
        $proprietaire->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Residence;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ResidenceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Residence::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'actif' => 'boolean',
        ]);

        $residence = Residence::create($validated);

        return response()->json($residence, 201);
    }

    public function show(Residence $residence): JsonResponse
    {
        return response()->json($residence->load('immeubles', 'logements'));
    }

    public function update(Request $request, Residence $residence): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'adresse' => 'sometimes|string|max:255',
            'ville' => 'sometimes|string|max:255',
            'actif' => 'sometimes|boolean',
        ]);

        $residence->update($validated);

        return response()->json($residence);
    }

    public function destroy(Residence $residence): JsonResponse
    {
        $residence->delete();

        return response()->json(null, 204);
    }
}

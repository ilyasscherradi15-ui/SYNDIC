<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Immeuble;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ImmeubleController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Immeuble::with('residence')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'nb_etages' => 'nullable|integer',
            'description' => 'nullable|string',
            'residence_id' => 'required|exists:residences,id',
        ]);

        $immeuble = Immeuble::create($validated);

        return response()->json($immeuble, 201);
    }

    public function show(Immeuble $immeuble): JsonResponse
    {
        return response()->json($immeuble->load('residence', 'logements'));
    }

    public function update(Request $request, Immeuble $immeuble): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'nb_etages' => 'nullable|integer',
            'description' => 'nullable|string',
            'residence_id' => 'sometimes|exists:residences,id',
        ]);

        $immeuble->update($validated);

        return response()->json($immeuble);
    }

    public function destroy(Immeuble $immeuble): JsonResponse
    {
        $immeuble->delete();

        return response()->json(null, 204);
    }
}

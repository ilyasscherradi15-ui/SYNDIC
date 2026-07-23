<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DocumentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Document::with('documentable')->get());
    }

    public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'chemin' => 'required|string|max:500',
        'documentable_type' => 'required|in:depense,logement,residence',
        'documentable_id' => 'required|integer',
    ]);

    $map = [
        'depense' => \App\Models\Depense::class,
        'logement' => \App\Models\Logement::class,
        'residence' => \App\Models\Residence::class,
    ];

    $validated['documentable_type'] = $map[$validated['documentable_type']];

    $document = Document::create($validated);

    return response()->json($document->load('documentable'), 201);
}
    public function show(Document $document): JsonResponse
    {
        return response()->json($document->load('documentable'));
    }

    public function update(Request $request, Document $document): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'chemin' => 'sometimes|string|max:500',
        ]);

        $document->update($validated);

        return response()->json($document);
    }

    public function destroy(Document $document): JsonResponse
    {
        $document->delete();

        return response()->json(null, 204);
    }
}

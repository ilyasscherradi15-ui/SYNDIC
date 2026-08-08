<?php

namespace Tests\Feature;

use App\Models\Depense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_attach_document_to_depense(): void
    {
        $depense = Depense::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/documents', [
            'nom' => 'Facture test',
            'chemin' => 'documents/facture.pdf',
            'documentable_type' => 'depense',
            'documentable_id' => $depense->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('documents', ['nom' => 'Facture test']);
    }
}

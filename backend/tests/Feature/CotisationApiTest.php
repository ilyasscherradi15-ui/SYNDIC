<?php

namespace Tests\Feature;

use App\Models\Logement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CotisationApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_create_cotisation(): void
    {
        $logement = Logement::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/cotisations', [
            'type' => 'mensuelle',
            'montant' => 500,
            'date_echeance' => '2026-08-01',
            'logement_id' => $logement->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('cotisations', ['montant' => 500]);
    }

    public function test_cotisation_default_statut_is_non_payee(): void
    {
        $logement = Logement::factory()->create();

        $this->actingAsAdmin()->postJson('/api/cotisations', [
            'type' => 'mensuelle',
            'montant' => 500,
            'date_echeance' => '2026-08-01',
            'logement_id' => $logement->id,
        ]);

        $this->assertDatabaseHas('cotisations', [
            'montant' => 500,
            'statut' => 'non_payee',
        ]);
    }
}

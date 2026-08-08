<?php

namespace Tests\Feature;

use App\Models\Logement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OccupantApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_create_occupant(): void
    {
        $logement = Logement::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/occupants', [
            'nom_complet' => 'Karim Test',
            'date_entree' => '2026-01-01',
            'logement_id' => $logement->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('occupants', ['nom_complet' => 'Karim Test']);
    }

    public function test_date_sortie_must_be_after_date_entree(): void
    {
        $logement = Logement::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/occupants', [
            'nom_complet' => 'Karim Test',
            'date_entree' => '2026-06-01',
            'date_sortie' => '2026-01-01',
            'logement_id' => $logement->id,
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('date_sortie');
    }
}

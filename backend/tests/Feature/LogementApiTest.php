<?php

namespace Tests\Feature;

use App\Models\Logement;
use App\Models\Proprietaire;
use App\Models\Residence;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LogementApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_create_logement(): void
    {
        $residence = Residence::factory()->create();
        $proprietaire = Proprietaire::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/logements', [
            'numero' => 'A1',
            'type' => 'appartement',
            'quote_part' => 5.5,
            'statut' => 'vacant',
            'residence_id' => $residence->id,
            'proprietaire_id' => $proprietaire->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('logements', ['numero' => 'A1']);
    }

    public function test_logement_type_must_be_valid_enum(): void
    {
        $residence = Residence::factory()->create();
        $proprietaire = Proprietaire::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/logements', [
            'numero' => 'A1',
            'type' => 'chateau',
            'quote_part' => 5,
            'statut' => 'vacant',
            'residence_id' => $residence->id,
            'proprietaire_id' => $proprietaire->id,
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('type');
    }

    public function test_logement_show_includes_relations(): void
    {
        $logement = Logement::factory()->create();

        $response = $this->actingAsAdmin()->getJson("/api/logements/{$logement->id}");

        $response->assertStatus(200)
            ->assertJsonStructure(['residence', 'proprietaire']);
    }
}

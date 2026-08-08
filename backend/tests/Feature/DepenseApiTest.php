<?php

namespace Tests\Feature;

use App\Models\Residence;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepenseApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_create_depense(): void
    {
        $residence = Residence::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/depenses', [
            'date_depense' => '2026-07-01',
            'categorie' => 'eau',
            'montant' => 1200,
            'residence_id' => $residence->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('depenses', ['montant' => 1200]);
    }

    public function test_categorie_must_be_valid_enum(): void
    {
        $residence = Residence::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/depenses', [
            'date_depense' => '2026-07-01',
            'categorie' => 'invalide',
            'montant' => 1200,
            'residence_id' => $residence->id,
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('categorie');
    }
}

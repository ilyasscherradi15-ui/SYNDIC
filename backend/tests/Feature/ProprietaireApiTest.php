<?php

namespace Tests\Feature;

use App\Models\Proprietaire;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProprietaireApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_admin_can_create_proprietaire(): void
    {
        $response = $this->actingAsAdmin()->postJson('/api/proprietaires', [
            'nom_complet' => 'Ahmed Test',
            'cin' => 'AB999999',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('proprietaires', ['cin' => 'AB999999']);
    }

    public function test_cin_must_be_unique(): void
    {
        Proprietaire::factory()->create(['cin' => 'DUPLICATE1']);

        $response = $this->actingAsAdmin()->postJson('/api/proprietaires', [
            'nom_complet' => 'Autre Personne',
            'cin' => 'DUPLICATE1',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('cin');
    }

    public function test_admin_can_update_proprietaire(): void
    {
        $proprietaire = Proprietaire::factory()->create();

        $response = $this->actingAsAdmin()->putJson("/api/proprietaires/{$proprietaire->id}", [
            'telephone' => '0600000000',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('proprietaires', ['telephone' => '0600000000']);
    }
}

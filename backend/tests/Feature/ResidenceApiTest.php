<?php

namespace Tests\Feature;

use App\Models\Residence;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResidenceApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_guest_cannot_access_residences(): void
    {
        $response = $this->getJson('/api/residences');
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_list_residences(): void
    {
        Residence::factory()->count(3)->create();

        $response = $this->actingAsAdmin()->getJson('/api/residences');

        $response->assertStatus(200)->assertJsonCount(3);
    }

    public function test_admin_can_create_residence(): void
    {
        $data = [
            'nom' => 'Résidence Test',
            'adresse' => '10 Rue Test',
            'ville' => 'Rabat',
        ];

        $response = $this->actingAsAdmin()->postJson('/api/residences', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('residences', ['nom' => 'Résidence Test']);
    }

    public function test_create_residence_requires_nom(): void
    {
        $response = $this->actingAsAdmin()->postJson('/api/residences', [
            'adresse' => '10 Rue Test',
            'ville' => 'Rabat',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('nom');
    }

    public function test_admin_can_delete_residence(): void
    {
        $residence = Residence::factory()->create();

        $response = $this->actingAsAdmin()->deleteJson("/api/residences/{$residence->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('residences', ['id' => $residence->id]);
    }

    public function test_resident_cannot_delete_residence(): void
    {
        $user = User::factory()->create(['role' => 'resident']);
        $residence = Residence::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/residences/{$residence->id}");

        $response->assertStatus(403);
    }
}

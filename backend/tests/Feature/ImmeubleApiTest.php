<?php

namespace Tests\Feature;

use App\Models\Immeuble;
use App\Models\Residence;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImmeubleApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_authenticated_user_can_list_immeubles(): void
    {
        Immeuble::factory()->count(2)->create();

        $response = $this->actingAsAdmin()->getJson('/api/immeubles');

        $response->assertStatus(200)->assertJsonCount(2);
    }

    public function test_admin_can_create_immeuble(): void
    {
        $residence = Residence::factory()->create();

        $response = $this->actingAsAdmin()->postJson('/api/immeubles', [
            'nom' => 'Bâtiment Test',
            'nb_etages' => 5,
            'residence_id' => $residence->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('immeubles', ['nom' => 'Bâtiment Test']);
    }

    public function test_create_immeuble_requires_valid_residence_id(): void
    {
        $response = $this->actingAsAdmin()->postJson('/api/immeubles', [
            'nom' => 'Bâtiment Test',
            'residence_id' => 9999,
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('residence_id');
    }

    public function test_resident_cannot_create_immeuble(): void
    {
        $user = User::factory()->create(['role' => 'resident']);
        $residence = Residence::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/immeubles', [
            'nom' => 'Test',
            'residence_id' => $residence->id,
        ]);

        $response->assertStatus(403);
    }
}

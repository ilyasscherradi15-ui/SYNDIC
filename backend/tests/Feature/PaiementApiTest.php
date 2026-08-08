<?php

namespace Tests\Feature;

use App\Models\Cotisation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaiementApiTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin()
    {
        $user = User::factory()->create(['role' => 'admin']);
        return $this->actingAs($user, 'sanctum');
    }

    public function test_full_payment_marks_cotisation_as_payee(): void
    {
        $cotisation = Cotisation::factory()->create(['montant' => 500, 'statut' => 'non_payee']);

        $this->actingAsAdmin()->postJson('/api/paiements', [
            'montant' => 500,
            'cotisation_id' => $cotisation->id,
        ]);

        $this->assertDatabaseHas('cotisations', [
            'id' => $cotisation->id,
            'statut' => 'payee',
        ]);
    }

    public function test_partial_payment_marks_cotisation_as_partielle(): void
    {
        $cotisation = Cotisation::factory()->create(['montant' => 500, 'statut' => 'non_payee']);

        $this->actingAsAdmin()->postJson('/api/paiements', [
            'montant' => 200,
            'cotisation_id' => $cotisation->id,
        ]);

        $this->assertDatabaseHas('cotisations', [
            'id' => $cotisation->id,
            'statut' => 'partielle',
        ]);
    }
}

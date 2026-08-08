<?php

namespace Database\Factories;

use App\Models\Logement;
use Illuminate\Database\Eloquent\Factories\Factory;

class CotisationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(['mensuelle', 'trimestrielle', 'annuelle', 'exceptionnelle']),
            'montant' => fake()->randomFloat(2, 100, 2000),
            'date_echeance' => fake()->date(),
            'statut' => 'non_payee',
            'logement_id' => Logement::factory(),
        ];
    }
}

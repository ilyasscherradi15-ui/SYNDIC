<?php

namespace Database\Factories;

use App\Models\Cotisation;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaiementFactory extends Factory
{
    public function definition(): array
    {
        return [
            'montant' => fake()->randomFloat(2, 100, 2000),
            'date_paiement' => fake()->date(),
            'moyen_paiement' => fake()->randomElement(['virement', 'espèces', 'chèque']),
            'cotisation_id' => Cotisation::factory(),
        ];
    }
}

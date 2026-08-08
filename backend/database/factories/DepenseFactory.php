<?php

namespace Database\Factories;

use App\Models\Residence;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepenseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'date_depense' => fake()->date(),
            'categorie' => fake()->randomElement(['gardiennage', 'nettoyage', 'eau', 'electricite', 'maintenance']),
            'description' => fake()->sentence(),
            'fournisseur' => fake()->company(),
            'montant' => fake()->randomFloat(2, 50, 5000),
            'residence_id' => Residence::factory(),
        ];
    }
}

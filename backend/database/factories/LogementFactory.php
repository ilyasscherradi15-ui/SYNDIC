<?php

namespace Database\Factories;

use App\Models\Proprietaire;
use App\Models\Residence;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogementFactory extends Factory
{
    public function definition(): array
    {
        return [
            'numero' => fake()->bothify('A##'),
            'type' => fake()->randomElement(['appartement', 'villa', 'duplex', 'bungalow']),
            'surface' => fake()->numberBetween(40, 200),
            'quote_part' => fake()->randomFloat(2, 1, 10),
            'statut' => fake()->randomElement(['occupe', 'vacant']),
            'residence_id' => Residence::factory(),
            'immeuble_id' => null,
            'proprietaire_id' => Proprietaire::factory(),
        ];
    }
}

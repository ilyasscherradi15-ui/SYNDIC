<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ResidenceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => 'Résidence ' . fake()->company(),
            'adresse' => fake()->streetAddress(),
            'ville' => fake()->city(),
            'actif' => true,
        ];
    }
}

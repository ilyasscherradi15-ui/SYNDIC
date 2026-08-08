<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProprietaireFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom_complet' => fake()->name(),
            'cin' => strtoupper(fake()->bothify('??######')),
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'adresse' => fake()->address(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Logement;
use Illuminate\Database\Eloquent\Factories\Factory;

class OccupantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom_complet' => fake()->name(),
            'telephone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'date_entree' => fake()->date(),
            'date_sortie' => null,
            'logement_id' => Logement::factory(),
        ];
    }
}

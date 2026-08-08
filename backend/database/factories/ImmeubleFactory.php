<?php

namespace Database\Factories;

use App\Models\Residence;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImmeubleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => 'Bâtiment ' . fake()->randomLetter(),
            'nb_etages' => fake()->numberBetween(1, 10),
            'description' => fake()->sentence(),
            'residence_id' => Residence::factory(),
        ];
    }
}

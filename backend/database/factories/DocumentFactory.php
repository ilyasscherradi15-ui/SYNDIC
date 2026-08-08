<?php

namespace Database\Factories;

use App\Models\Depense;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => fake()->word() . '.pdf',
            'chemin' => 'documents/' . fake()->uuid() . '.pdf',
            'documentable_type' => Depense::class,
            'documentable_id' => Depense::factory(),
        ];
    }
}

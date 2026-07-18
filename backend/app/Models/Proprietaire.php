<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Proprietaire extends Model
{
    protected $fillable = ['nom_complet', 'cin', 'telephone', 'email', 'adresse'];

    public function logements(): HasMany
    {
        return $this->hasMany(Logement::class);
    }
}
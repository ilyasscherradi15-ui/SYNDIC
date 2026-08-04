<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Residence extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'adresse', 'ville', 'actif'];

    public function immeubles(): HasMany
    {
        return $this->hasMany(Immeuble::class);
    }

    public function logements(): HasMany
    {
        return $this->hasMany(Logement::class);
    }

    public function depenses(): HasMany
    {
        return $this->hasMany(Depense::class);
    }

    public function utilisateurs(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'residence_user');
    }
}

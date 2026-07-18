<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Logement extends Model
{
    protected $fillable = [
        'numero', 'type', 'surface', 'quote_part', 'statut',
        'residence_id', 'immeuble_id', 'proprietaire_id',
    ];

    public function residence(): BelongsTo
    {
        return $this->belongsTo(Residence::class);
    }

    public function immeuble(): BelongsTo
    {
        return $this->belongsTo(Immeuble::class);
    }

    public function proprietaire(): BelongsTo
    {
        return $this->belongsTo(Proprietaire::class);
    }

    public function occupants(): HasMany
    {
        return $this->hasMany(Occupant::class);
    }

    public function cotisations(): HasMany
    {
        return $this->hasMany(Cotisation::class);
    }
}
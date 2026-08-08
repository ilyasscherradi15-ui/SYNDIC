<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Immeuble extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'nb_etages', 'description', 'residence_id'];

    public function residence(): BelongsTo
    {
        return $this->belongsTo(Residence::class);
    }

    public function logements(): HasMany
    {
        return $this->hasMany(Logement::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Occupant extends Model
{
    protected $fillable = ['nom_complet', 'telephone', 'email', 'date_entree', 'date_sortie', 'logement_id'];

    public function logement(): BelongsTo
    {
        return $this->belongsTo(Logement::class);
    }
}
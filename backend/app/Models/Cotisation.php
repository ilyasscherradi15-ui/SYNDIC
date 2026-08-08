<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cotisation extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'montant', 'date_echeance', 'statut', 'logement_id'];

    public function logement(): BelongsTo
    {
        return $this->belongsTo(Logement::class);
    }

    public function paiements(): HasMany
    {
        return $this->hasMany(Paiement::class);
    }
}

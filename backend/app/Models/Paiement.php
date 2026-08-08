<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = ['montant', 'date_paiement', 'moyen_paiement', 'cotisation_id'];

    public function cotisation(): BelongsTo
    {
        return $this->belongsTo(Cotisation::class);
    }
}

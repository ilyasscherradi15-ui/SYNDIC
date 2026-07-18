<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Depense extends Model
{
    protected $fillable = ['date_depense', 'categorie', 'description', 'fournisseur', 'montant', 'residence_id'];

    public function residence(): BelongsTo
    {
        return $this->belongsTo(Residence::class);
    }

    public function documents(): MorphMany
    {
        return $this->morphMany(Document::class, 'documentable');
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Document extends Model
{
    protected $fillable = ['nom', 'chemin', 'documentable_type', 'documentable_id'];

    public function documentable(): MorphTo
    {
        return $this->morphTo();
    }
}

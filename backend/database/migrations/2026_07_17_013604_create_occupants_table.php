<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('occupants', function (Blueprint $table) {
            $table->id();
            $table->string('nom_complet');
            $table->string('telephone')->nullable();
            $table->string('email')->nullable();
            $table->date('date_entree');
            $table->date('date_sortie')->nullable();
            $table->foreignId('logement_id')->constrained('logements')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('occupants');
    }
};
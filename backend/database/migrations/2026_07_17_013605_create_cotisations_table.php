<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cotisations', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['mensuelle', 'trimestrielle', 'annuelle', 'exceptionnelle']);
            $table->decimal('montant', 10, 2);
            $table->date('date_echeance');
            $table->enum('statut', ['payee', 'partielle', 'retard', 'non_payee'])->default('non_payee');
            $table->foreignId('logement_id')->constrained('logements')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cotisations');
    }
};
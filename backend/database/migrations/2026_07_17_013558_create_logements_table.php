public function up(): void
{
    Schema::create('logements', function (Blueprint $table) {
        $table->id();
        $table->string('numero');
        $table->enum('type', ['appartement', 'villa', 'duplex', 'bungalow']);
        $table->decimal('surface', 8, 2)->nullable();
        $table->decimal('quote_part', 5, 2);
        $table->enum('statut', ['occupe', 'vacant'])->default('vacant');
        $table->foreignId('residence_id')->constrained()->onDelete('cascade');
        $table->foreignId('immeuble_id')->nullable()->constrained()->onDelete('cascade');
        $table->foreignId('proprietaire_id')->constrained('proprietaires');
        $table->timestamps();
    });
}
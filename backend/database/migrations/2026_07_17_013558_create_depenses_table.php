public function up(): void
{
    Schema::create('depenses', function (Blueprint $table) {
        $table->id();
        $table->date('date_depense');
        $table->string('categorie');
        $table->text('description')->nullable();
        $table->string('fournisseur')->nullable();
        $table->decimal('montant', 10, 2);
        $table->foreignId('residence_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
}
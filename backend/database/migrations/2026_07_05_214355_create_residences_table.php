public function up(): void
{
    Schema::create('residences', function (Blueprint $table) {
        $table->id();
        $table->string('nom');
        $table->string('adresse');
        $table->string('ville');
        $table->boolean('actif')->default(true);
        $table->timestamps();
    });
}
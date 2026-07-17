public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('role')->default('resident'); // admin, syndic, resident
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('role');
    });
}
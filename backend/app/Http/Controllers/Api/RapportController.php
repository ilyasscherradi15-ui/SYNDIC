<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Residence;
use App\Models\Logement;
use App\Models\Cotisation;
use App\Models\Depense;
use Barryvdh\DomPDF\Facade\Pdf;

class RapportController extends Controller
{
    public function financier()
    {
        $residences = Residence::count();
        $logements = Logement::count();

        $totalAttendu = Cotisation::sum('montant');
        $totalEncaisse = Cotisation::where('statut', 'payee')->sum('montant');
        $totalImpaye = Cotisation::whereIn('statut', ['non_payee', 'retard', 'partielle'])->sum('montant');
        $totalDepenses = Depense::sum('montant');

        $solde = $totalEncaisse - $totalDepenses;

        $data = [
            'date' => now()->format('d/m/Y'),
            'nbResidences' => $residences,
            'nbLogements' => $logements,
            'totalAttendu' => $totalAttendu,
            'totalEncaisse' => $totalEncaisse,
            'totalImpaye' => $totalImpaye,
            'totalDepenses' => $totalDepenses,
            'solde' => $solde,
        ];

        $pdf = Pdf::loadView('rapports.financier', $data);

        return $pdf->download('rapport-financier-' . now()->format('Y-m-d') . '.pdf');
    }
}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: sans-serif; font-size: 14px; color: #333; }
        h1 { color: #1976d2; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td, th { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f5f5f5; }
        .solde-positif { color: green; font-weight: bold; }
        .solde-negatif { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Rapport financier — Syndic de Résidence</h1>
    <p>Généré le {{ $date }}</p>

    <table>
        <tr><th>Indicateur</th><th>Valeur</th></tr>
        <tr><td>Nombre de résidences</td><td>{{ $nbResidences }}</td></tr>
        <tr><td>Nombre de logements</td><td>{{ $nbLogements }}</td></tr>
        <tr><td>Total cotisations attendues</td><td>{{ number_format($totalAttendu, 2) }} DH</td></tr>
        <tr><td>Total encaissé</td><td>{{ number_format($totalEncaisse, 2) }} DH</td></tr>
        <tr><td>Total impayés</td><td>{{ number_format($totalImpaye, 2) }} DH</td></tr>
        <tr><td>Total dépenses</td><td>{{ number_format($totalDepenses, 2) }} DH</td></tr>
        <tr>
            <td><strong>Solde disponible</strong></td>
            <td class="{{ $solde >= 0 ? 'solde-positif' : 'solde-negatif' }}">
                {{ number_format($solde, 2) }} DH
            </td>
        </tr>
    </table>
</body>
</html>

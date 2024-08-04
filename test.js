const tableData = [
    { colonne1: 'Valeur 1', colonne2: 'Valeur 2', colonne3: 'Valeur 3' },
    { colonne1: 'Valeur 4', colonne2: 'Valeur 5', colonne3: 'Valeur 6' },
    // Autres lignes de données...
  ];
  
  // Obtenir le nombre de colonnes
  const numberOfColumns = Object.keys(tableData[0]).length;
  
  // Obtenir tous les noms de colonnes dans un tableau
  const columnNames = Object.keys(tableData[0]);
  
  console.log('Nombre de colonnes :', numberOfColumns);
  console.log('Noms de colonnes :', columnNames);
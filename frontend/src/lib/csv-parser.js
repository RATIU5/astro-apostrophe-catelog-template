/**
 * Parse CSV string into a structured information table object
 *
 * Expected CSV format:
 * - First row: column headers (first cell can be empty or a corner label)
 * - First column: row headers
 * - Remaining cells: data values
 *
 * Example CSV:
 * ,Small,Medium,Large
 * Chest (inches),34-36,38-40,42-44
 * Waist (inches),28-30,32-34,36-38
 *
 * Returns an object compatible with the old informationTable structure:
 * {
 *   tableTitle: string,
 *   columnNames: [{name: string}],
 *   rowNames: [{name: string}],
 *   cellData: [{rowIndex: number, columnIndex: number, value: string}]
 * }
 */
export function parseInformationTableCsv(csvString, tableTitle = '') {
  if (!csvString || typeof csvString !== 'string') {
    return null;
  }

  // Trim and split by lines
  const lines = csvString.trim().split('\n').filter(line => line.trim());

  if (lines.length < 2) {
    // Need at least header row + one data row
    return null;
  }

  // Parse CSV lines (simple parser - handles basic CSV)
  const rows = lines.map(line => {
    // Split by comma, handling quoted fields if needed
    const cells = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === `'`) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    // Push the last cell
    cells.push(currentCell.trim());

    return cells;
  });

  // First row contains column headers (skip first cell which is the corner)
  const headerRow = rows[0];
  const columnNames = headerRow.slice(1).map(name => ({ name: name || '' }));

  // Remaining rows contain row headers (first cell) and data cells
  const rowNames = [];
  const cellData = [];

  for (let rowIdx = 1; rowIdx < rows.length; rowIdx++) {
    const row = rows[rowIdx];

    // First cell is the row header
    const rowName = row[0] || '';
    rowNames.push({ name: rowName });

    // Remaining cells are data
    for (let colIdx = 1; colIdx < row.length; colIdx++) {
      const value = row[colIdx] || '';
      cellData.push({
        rowIndex: rowIdx - 1,  // Adjust index since we skip header row
        columnIndex: colIdx - 1,  // Adjust index since we skip row header column
        value: value,
        cellLabel: `${rowName} - ${columnNames[colIdx - 1]?.name || colIdx}`
      });
    }
  }

  return {
    tableTitle: tableTitle || '',
    columnNames,
    rowNames,
    cellData
  };
}

/**
 * Simple helper to render the parsed table as HTML table rows
 * This can be used directly in Astro templates
 */
export function renderTableData(parsedTable) {
  if (!parsedTable || !parsedTable.columnNames || !parsedTable.rowNames) {
    return null;
  }

  return {
    title: parsedTable.tableTitle,
    columns: parsedTable.columnNames.map(col => col.name),
    rows: parsedTable.rowNames.map((row, rowIdx) => ({
      header: row.name,
      cells: parsedTable.columnNames.map((col, colIdx) => {
        const cellData = parsedTable.cellData?.find(
          cell => cell.rowIndex === rowIdx && cell.columnIndex === colIdx
        );
        return cellData?.value || '';
      })
    }))
  };
}

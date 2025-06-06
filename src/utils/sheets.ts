import type { Product, SheetConfig } from '../types';

export async function fetchProductsFromSheet(config: SheetConfig): Promise<Product[]> {
  const { sheetId, range } = config;
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=${range}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    // Remove the Google Visualization API callback wrapper
    const jsonString = text.substring(47).slice(0, -2);
    const data = JSON.parse(jsonString);

    if (!data.table || !data.table.rows) {
      console.log('No data found in sheet');
      return [];
    }

    // Map the data to our product structure
    // Skip the header row (first row)
    const products = data.table.rows.slice(1).map((row: any) => ({
      title: row.c[0]?.v || '',
      link: row.c[1]?.v || '',
      image: row.c[2]?.v || ''
    }));

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

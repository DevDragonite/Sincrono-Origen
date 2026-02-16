export type BatchData = {
    id: string;
    roastDate: string;
    farm: string;
    variety: string;
    elevation: number;
    tds: number; // Percentage
    beverageWeight: number; // grams
    dryCoffeeWeight: number; // grams
};

/**
 * Calculates the Extraction Yield (Rendimiento de Extracción)
 * Formula: RE (%) = (TDS (%) * Peso de la bebida (g)) / Peso del café seco (g)
 */
export function calculateExtractionYield(tds: number, beverageWeight: number, dryCoffeeWeight: number): number {
    if (dryCoffeeWeight === 0) return 0;
    return (tds * beverageWeight) / dryCoffeeWeight;
}

export const MOCK_BATCH: BatchData = {
    id: "2026-B001",
    roastDate: "2026-02-15",
    farm: "Hacienda La Trinidad",
    variety: "Red Bourbon",
    elevation: 1800,
    tds: 1.35,
    beverageWeight: 300,
    dryCoffeeWeight: 18
};

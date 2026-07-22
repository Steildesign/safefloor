export type PubChemIdentity = {
  cid: number;
  title: string;
  molecularFormula: string;
  molecularWeight: string;
  inchiKey: string;
  sourceUrl: string;
  status: 'live' | 'fallback';
};

const propertyFallbacks: Record<number, Omit<PubChemIdentity, 'sourceUrl' | 'status'>> = {
  1615: { cid: 1615, title: '3,4-Methylenedioxymethamphetamine', molecularFormula: 'C11H15NO2', molecularWeight: '193.24', inchiKey: 'SHXWCVYOXRDMCX-UHFFFAOYSA-N' },
  3821: { cid: 3821, title: 'Ketamine', molecularFormula: 'C13H16ClNO', molecularWeight: '237.72', inchiKey: 'YQEZLKZALYSWHR-UHFFFAOYSA-N' },
  16078: { cid: 16078, title: 'Tetrahydrocannabinol', molecularFormula: 'C21H30O2', molecularWeight: '314.5', inchiKey: 'CYQFCXCEBYINGO-IAGOWNOFSA-N' },
  702: { cid: 702, title: 'Ethanol', molecularFormula: 'C2H6O', molecularWeight: '46.07', inchiKey: 'LFQSCWFLJHTTHZ-UHFFFAOYSA-N' },
};

const cache = new Map<number, PubChemIdentity>();

export async function getPubChemIdentity(cid: number): Promise<PubChemIdentity> {
  const cached = cache.get(cid);
  if (cached) return cached;
  const sourceUrl = `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`;
  const fallback = { ...propertyFallbacks[cid], sourceUrl, status: 'fallback' as const };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);
    const endpoint = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/Title,MolecularFormula,MolecularWeight,InChIKey/JSON`;
    const response = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) return fallback;
    const payload = await response.json();
    const item = payload?.PropertyTable?.Properties?.[0];
    if (!item) return fallback;
    const identity: PubChemIdentity = {
      cid: item.CID,
      title: item.Title,
      molecularFormula: item.MolecularFormula,
      molecularWeight: String(item.MolecularWeight),
      inchiKey: item.InChIKey,
      sourceUrl,
      status: 'live',
    };
    cache.set(cid, identity);
    return identity;
  } catch {
    return fallback;
  }
}

export const berlinDrugCheckingSource = {
  id: 'euda-tedi-berlin',
  publisher: 'EUDA · TEDI',
  region: 'Berlin · Deutschland',
  period: '2019–2025',
  publishedAt: '16.07.2026',
  cadence: 'Halbjährlich aggregiert',
  sourceUrl: 'https://www.euda.europa.eu/data/repository/drug-checking-data-trans-european-drug-information-tedi-network_en',
  license: 'EUDA reuse policy / source attribution',
} as const;

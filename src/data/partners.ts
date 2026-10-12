export interface Partner {
  name: string
  logo: string // path relative to /public, e.g. /logos/partner-abc.svg
  url?: string
}

// TODO: Doplňte reálná loga partnerů. Soubory umístěte do public/logos/
// Pokud je pole prázdné, sekce se na homepage nevykreslí.
export const partners: Partner[] = []

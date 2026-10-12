export interface Stat {
  value: string
  label: string
  labelEn: string
}

// TODO: doplňte reálná čísla před spuštěním
export const stats: Stat[] = [
  { value: '2026', label: 'Rok vzniku', labelEn: 'Founded' },
  { value: '4', label: 'Aktivní značky', labelEn: 'Active brands' },
  // TODO: { value: '??', label: 'Pořádaných eventů', labelEn: 'Events organised' },
]

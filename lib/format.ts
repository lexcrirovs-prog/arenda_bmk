const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('ru-RU')

export function formatPrice(value: number): string {
  return priceFormatter.format(value)
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

export function formatPower(kW: number): string {
  if (kW >= 1000) {
    const mw = kW / 1000
    return `${numberFormatter.format(Math.round(mw * 10) / 10)} МВт`
  }
  return `${numberFormatter.format(Math.round(kW))} кВт`
}

export function formatSteam(tph: number): string {
  return `${numberFormatter.format(tph)} т/ч`
}

export function formatHours(h: number): string {
  if (h < 1) return `${Math.round(h * 60)} мин`
  return `${numberFormatter.format(h)} ч`
}

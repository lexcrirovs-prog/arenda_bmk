import {
  HEAT_LOSS_COEFF,
  REF_CEILING_HEIGHT,
  SAFETY_FACTOR,
} from '@/lib/constants'
import { pickModelByPower, type Product } from '@/content/products'
import type { CalculatorInput } from './calculator.schema'

const insulationFactor: Record<CalculatorInput['insulation'], number> = {
  high: 0.9,
  medium: 1.0,
  low: 1.15,
}

const facilityFactor: Record<CalculatorInput['facility'], number> = {
  warehouse: 0.9,
  office: 1.0,
  production: 1.1,
  food: 1.2,
  pharma: 1.25,
}

export interface CalculatorResult {
  /** Базовая расчётная мощность Q = S · q · N, кВт */
  baseKW: number
  /** Итоговая мощность с учётом всех поправок, кВт */
  correctedKW: number
  heightFactor: number
  insulationFactor: number
  facilityFactor: number
  recommended: Product
  monthlyRate: number
}

export function calcHeatPower(input: CalculatorInput): CalculatorResult {
  const base = input.area * HEAT_LOSS_COEFF * SAFETY_FACTOR
  const heightFactor =
    input.ceilingHeight > REF_CEILING_HEIGHT
      ? input.ceilingHeight / REF_CEILING_HEIGHT
      : 1
  const iFactor = insulationFactor[input.insulation]
  const fFactor = facilityFactor[input.facility]
  const corrected = base * heightFactor * iFactor * fFactor

  const recommended = pickModelByPower(corrected, input.boilerType)
  return {
    baseKW: Math.round(base),
    correctedKW: Math.round(corrected),
    heightFactor: round2(heightFactor),
    insulationFactor: round2(iFactor),
    facilityFactor: round2(fFactor),
    recommended,
    monthlyRate: recommended.monthlyRate,
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

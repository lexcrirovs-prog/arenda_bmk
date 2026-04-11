export type FuelType = 'diesel' | 'gas' | 'dual'
export type BoilerType = 'steam' | 'hotwater'

export interface Product {
  id: string
  slug: string
  title: string
  shortTitle: string
  type: BoilerType
  /** Номинальная тепловая мощность, кВт */
  powerKW: number
  /** Паропроизводительность, т/ч (только для steam) */
  steamTonsPerHour?: number
  fuel: FuelType[]
  /** Рабочее давление, бар (для steam) */
  pressureBar?: number
  /** Длина/ширина/высота, мм */
  dimensions: { length: number; width: number; height: number }
  weightKg: number
  /** Расход топлива при номинальной нагрузке */
  fuelConsumption: string
  efficiency: number
  /** Ежемесячная ставка аренды, ₽ */
  monthlyRate: number
  /** Срок мобилизации, часов */
  mobilizationHours: number
  features: string[]
  description: string
  imageAlt: string
  pdfUrl: string
  dwgUrl: string
}

export const products: Product[] = [
  {
    id: 'bmk-steam-10',
    slug: 'bmk-steam-10',
    title: 'БМК-Пар 10,0 — паровая котельная 10 т/ч',
    shortTitle: 'БМК-Пар 10,0',
    type: 'steam',
    powerKW: 7800,
    steamTonsPerHour: 10,
    fuel: ['gas', 'diesel', 'dual'],
    pressureBar: 13,
    dimensions: { length: 12192, width: 2438, height: 2896 },
    weightKg: 24500,
    fuelConsumption: '780 м³/ч газ / 820 л/ч ДТ',
    efficiency: 93,
    monthlyRate: 1_890_000,
    mobilizationHours: 24,
    features: [
      'Двухконтурная схема с деаэратором',
      'Полная автоматика BMS',
      'Удалённый мониторинг (SCADA)',
      'Каскадное управление до 4 модулей',
    ],
    description:
      'Флагманская паровая котельная в 40-футовом контейнере для непрерывных технологических процессов: пищевое производство, фармацевтика, целлюлозно-бумажная отрасль. Комплектуется деаэратором, водоподготовкой обратного осмоса и двумя питательными насосами с АВР.',
    imageAlt: 'Паровая контейнерная котельная 10 т/ч, 40-футовый Conex',
    pdfUrl: '/docs/bmk-steam-10.pdf',
    dwgUrl: '/docs/bmk-steam-10.dwg',
  },
  {
    id: 'bmk-steam-4',
    slug: 'bmk-steam-4',
    title: 'БМК-Пар 4,0 — паровая котельная 4 т/ч',
    shortTitle: 'БМК-Пар 4,0',
    type: 'steam',
    powerKW: 3100,
    steamTonsPerHour: 4,
    fuel: ['gas', 'diesel', 'dual'],
    pressureBar: 10,
    dimensions: { length: 12192, width: 2438, height: 2896 },
    weightKg: 18200,
    fuelConsumption: '310 м³/ч газ / 330 л/ч ДТ',
    efficiency: 92,
    monthlyRate: 890_000,
    mobilizationHours: 24,
    features: [
      'Компактная одномодульная схема',
      'Блок ХВО на борту',
      'Модульное расширение до 16 т/ч',
      'Класс защиты IP54',
    ],
    description:
      'Оптимальная паровая установка для малых и средних производств: молочные и мясоперерабатывающие заводы, прачечные, тепличные хозяйства. Включает встроенную водоподготовку и бак-аккумулятор конденсата.',
    imageAlt: 'Паровая контейнерная котельная 4 т/ч',
    pdfUrl: '/docs/bmk-steam-4.pdf',
    dwgUrl: '/docs/bmk-steam-4.dwg',
  },
  {
    id: 'bmk-steam-1',
    slug: 'bmk-steam-1',
    title: 'БМК-Пар 1,0 — паровая котельная 1 т/ч',
    shortTitle: 'БМК-Пар 1,0',
    type: 'steam',
    powerKW: 780,
    steamTonsPerHour: 1,
    fuel: ['diesel', 'gas'],
    pressureBar: 8,
    dimensions: { length: 6058, width: 2438, height: 2591 },
    weightKg: 7800,
    fuelConsumption: '78 м³/ч газ / 82 л/ч ДТ',
    efficiency: 91,
    monthlyRate: 310_000,
    mobilizationHours: 12,
    features: [
      '20-фут контейнер, лёгкая перевозка',
      'Горелка Weishaupt / Oilon',
      'Минимальные требования к площадке',
      'Готовность к работе за 4 часа после установки',
    ],
    description:
      'Мобильное решение для экстренной подмены на время ППР или сезонного пикового потребления: сыроварни, пивоварни, локальные пищевые линии. Подключение по быстроразъёмным соединениям.',
    imageAlt: 'Малая паровая котельная 1 т/ч в 20-фут контейнере',
    pdfUrl: '/docs/bmk-steam-1.pdf',
    dwgUrl: '/docs/bmk-steam-1.dwg',
  },
  {
    id: 'bmk-hw-10',
    slug: 'bmk-hw-10',
    title: 'БМК-Т 10 МВт — водогрейная котельная 10 МВт',
    shortTitle: 'БМК-Т 10,0',
    type: 'hotwater',
    powerKW: 10000,
    fuel: ['gas', 'diesel', 'dual'],
    dimensions: { length: 12192, width: 2438, height: 2896 },
    weightKg: 22000,
    fuelConsumption: '1000 м³/ч газ / 1050 л/ч ДТ',
    efficiency: 94,
    monthlyRate: 2_150_000,
    mobilizationHours: 36,
    features: [
      'Два котла ICI Caldaie по 5 МВт',
      'Температурный график 115/70 °C',
      'Двойной резерв сетевых насосов',
      'Частотное управление нагрузкой',
    ],
    description:
      'Высокомощная водогрейная установка для теплоснабжения микрорайонов, крупных производственных корпусов и строительных площадок. Подключается к существующим сетям через гидрострелку и пластинчатый теплообменник.',
    imageAlt: 'Водогрейная контейнерная котельная 10 МВт',
    pdfUrl: '/docs/bmk-hw-10.pdf',
    dwgUrl: '/docs/bmk-hw-10.dwg',
  },
  {
    id: 'bmk-hw-3',
    slug: 'bmk-hw-3',
    title: 'БМК-Т 3 МВт — водогрейная котельная 3 МВт',
    shortTitle: 'БМК-Т 3,0',
    type: 'hotwater',
    powerKW: 3000,
    fuel: ['gas', 'diesel', 'dual'],
    dimensions: { length: 12192, width: 2438, height: 2896 },
    weightKg: 15800,
    fuelConsumption: '300 м³/ч газ / 315 л/ч ДТ',
    efficiency: 93,
    monthlyRate: 720_000,
    mobilizationHours: 24,
    features: [
      'Три котла по 1 МВт, каскад',
      'Погодозависимая автоматика',
      'Бак-аккумулятор 2 м³',
      'Готовая схема ГВС',
    ],
    description:
      'Универсальная водогрейная БМК для промышленных объектов средней мощности: склады, логистические центры, строительные городки. Поддерживает одновременную работу на отопление и ГВС.',
    imageAlt: 'Водогрейная контейнерная котельная 3 МВт',
    pdfUrl: '/docs/bmk-hw-3.pdf',
    dwgUrl: '/docs/bmk-hw-3.dwg',
  },
  {
    id: 'bmk-hw-1',
    slug: 'bmk-hw-1',
    title: 'БМК-Т 1 МВт — дизельная котельная 1 МВт',
    shortTitle: 'БМК-Т 1,0',
    type: 'hotwater',
    powerKW: 1000,
    fuel: ['diesel', 'gas'],
    dimensions: { length: 6058, width: 2438, height: 2591 },
    weightKg: 6500,
    fuelConsumption: '105 л/ч ДТ',
    efficiency: 92,
    monthlyRate: 240_000,
    mobilizationHours: 8,
    features: [
      'Топливный бак 3 м³ интегрирован',
      'Горелка с модуляцией 20–100%',
      '20-фут контейнер, готовность за 4 часа',
      'Встроенная шунтовая схема',
    ],
    description:
      'Самая популярная модель для подогрева бетонных смесей на стройплощадках, временного теплоснабжения вахтовых посёлков и аварийной подмены. Минимальные требования к инфраструктуре, поставка с топливным баком.',
    imageAlt: 'Мобильная дизельная котельная 1 МВт',
    pdfUrl: '/docs/bmk-hw-1.pdf',
    dwgUrl: '/docs/bmk-hw-1.dwg',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByType(type: BoilerType): Product[] {
  return products.filter((p) => p.type === type)
}

/**
 * Подбор рекомендованной модели по расчётной мощности в кВт.
 * Возвращает ближайшую модель с запасом (>= требуемой) или флагман.
 */
export function pickModelByPower(
  requiredKW: number,
  type: BoilerType = 'hotwater'
): Product {
  const pool = products
    .filter((p) => p.type === type)
    .sort((a, b) => a.powerKW - b.powerKW)
  const match = pool.find((p) => p.powerKW >= requiredKW)
  return match ?? pool[pool.length - 1]
}

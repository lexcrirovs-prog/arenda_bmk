import { z } from 'zod'

export const calculatorSchema = z.object({
  facility: z.enum(['warehouse', 'production', 'office', 'food', 'pharma'], {
    errorMap: () => ({ message: 'Выберите тип объекта' }),
  }),
  area: z
    .number({ invalid_type_error: 'Введите площадь в м²' })
    .int('Введите целое число')
    .min(50, 'Минимум 50 м² для упрощённой методики')
    .max(20000, 'Для объектов свыше 20 000 м² нужен индивидуальный расчёт'),
  ceilingHeight: z
    .number({ invalid_type_error: 'Введите высоту потолков в метрах' })
    .min(2.5, 'Минимум 2,5 м')
    .max(12, 'Максимум 12 м — для больших высот нужен детальный расчёт'),
  insulation: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: 'Выберите уровень утепления' }),
  }),
  boilerType: z.enum(['steam', 'hotwater']),
})

export type CalculatorInput = z.infer<typeof calculatorSchema>

export const leadSchema = z.object({
  name: z.string().min(2, 'Введите ваше имя'),
  company: z.string().min(2, 'Укажите компанию'),
  phone: z
    .string()
    .min(10, 'Введите телефон')
    .regex(/^[\d\s()+\-]+$/, 'Допустимы только цифры и +-() '),
  email: z.string().email('Введите корректный e-mail').optional().or(z.literal('')),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: 'Требуется согласие на обработку данных',
    }),
})

export type LeadInput = z.infer<typeof leadSchema>

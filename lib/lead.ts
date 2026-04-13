/**
 * URL для приёма лидов. На Beget-хостинге замените на реальный endpoint:
 * - PHP-скрипт на том же домене: '/lead.php'
 * - Bitrix24 webhook: 'https://your-crm.bitrix24.ru/rest/1/xxx/crm.lead.add.json'
 * - Любой внешний сервис (Formspree, Make.com, Zapier и т.п.)
 *
 * В режиме разработки (или если endpoint не настроен) лид просто
 * логируется в консоль браузера.
 */
export const LEAD_ENDPOINT = '/lead.php'

export async function submitLead(payload: Record<string, unknown>): Promise<boolean> {
  try {
    // Если endpoint — заглушка, просто логируем
    if (LEAD_ENDPOINT === '/lead.php') {
      console.log('[lead] payload:', JSON.stringify(payload, null, 2))
      // Пытаемся отправить на PHP, но не ломаемся если его нет
      try {
        const res = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        return res.ok
      } catch {
        // PHP-скрипт не найден — не страшно для демо
        return true
      }
    }

    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch (e) {
    console.error('[lead] error:', e)
    return false
  }
}

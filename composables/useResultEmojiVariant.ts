import { formatCurrencyTHB } from '~/utils/format'

// Prototype only (NEXT-6741): which rule picks the result emoji, kept in ?emoji= so a link opens the same one.
// Without ?emoji= the page uses the ticket's rule and shows no picker
export const resultEmojiVariants = ['ticket', 'usage', 'usage-hint'] as const
export type ResultEmojiVariant = typeof resultEmojiVariants[number]

export const usageEmoji = { high: '😄', mid: '🙂', low: '😢' } as const

export function useResultEmojiVariant() {
  const route = useRoute()
  const router = useRouter()
  const variant = computed<ResultEmojiVariant>({
    get: () => (resultEmojiVariants.includes(route.query.emoji as ResultEmojiVariant) ? route.query.emoji as ResultEmojiVariant : 'ticket'),
    set: (emoji) => router.replace({ query: { ...route.query, emoji } })
  })
  const isPrototype = computed(() => 'emoji' in route.query)
  return { variant, isPrototype }
}

// One line under the emoji saying how much tax the buyable deductions could still cut
export const usageHintText = (usage: { maxSavedTax: number, remainingTax: number }) => {
  if (usage.maxSavedTax <= 0) return 'ซื้อลดหย่อนเพิ่มก็ไม่ช่วยลดภาษีแล้ว'
  if (usage.remainingTax < 1) return 'ใช้สิทธิ์ลดหย่อนคุ้มครบแล้ว'
  return `ยังลดภาษีได้อีก ${formatCurrencyTHB(usage.remainingTax)} บาท จากประกัน กองทุน PVD/RMF และ ThaiESG`
}

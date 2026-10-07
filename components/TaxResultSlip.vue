<template>
	<!-- The page H1 titles the result; the slip carries a document caption so the title isn't repeated -->
	<section
		class="bg-white border border-gray-200 rounded-xl overflow-hidden"
		aria-label="ใบสรุปภาษี ปีภาษี 2569"
		data-test-id="tax-calculator__tax-result-slip--container"
	>
		<div class="px-6 pt-6 pb-4 border-b border-dashed border-gray-300">
			<div class="flex items-baseline justify-between gap-4">
				<span class="text-lg font-bold text-gray-800" data-test-id="tax-calculator__tax-result-slip--title">ใบสรุปภาษี</span>
				<span class="text-sm text-gray-500 whitespace-nowrap" data-test-id="tax-calculator__tax-result-slip--tax-year">ปีภาษี 2569</span>
			</div>
			<!-- Explains the result without restating the amount, so the amount appears once -->
			<p class="text-sm text-gray-500 mt-1 text-pretty" data-test-id="tax-calculator__tax-result-slip--explanation">
				{{ result.explanation }}
			</p>
		</div>

		<div class="px-6 py-5 border-b border-dashed border-gray-300">
			<div class="flex items-start justify-between gap-4">
				<div class="min-w-0">
					<div class="text-md font-bold text-gray-800 mb-1" data-test-id="tax-calculator__tax-result-slip--status">{{ result.label }}</div>
					<div class="flex items-end gap-2 flex-wrap">
						<div
							class="font-bold tabular-nums"
							:class="[result.kind === 'zero' ? 'text-2xl' : 'text-4xl', result.kind === 'refund' ? 'text-green-600' : 'text-gray-800']"
							data-test-id="tax-calculator__tax-result-slip--amount"
						>
							{{ result.amount }}
						</div>
						<div v-if="result.kind !== 'zero'" class="text-md font-semibold text-gray-500 mb-1" data-test-id="tax-calculator__tax-result-slip--currency">THB</div>
					</div>
				</div>
				<!-- Mood of the result (NEXT-6741): decoration, the label above already says it -->
				<div class="text-5xl leading-none shrink-0" aria-hidden="true" data-test-id="tax-calculator__tax-result-slip--emoji">{{ emoji }}</div>
			</div>
			<p v-if="emojiVariant === 'usage-hint'" class="text-sm text-gray-600 mt-3" data-test-id="tax-calculator__tax-result-slip--usage-hint">{{ usageHint }}</p>
			<div class="flex items-center gap-2 text-sm mt-3" data-test-id="tax-calculator__tax-result-slip--tax-rate">
				<span class="text-gray-500">อัตราภาษีสูงสุด</span>
				<span
					class="font-semibold px-2 py-1 rounded-full"
					:style="topRate > 0 ? 'background-color: #00E76B;' : 'background-color: #D3DFE5;'"
					data-test-id="tax-calculator__tax-result-slip--tax-rate-value"
				>{{ topRate }}%</span>
			</div>
		</div>

		<dl class="px-6 py-4 text-sm space-y-2" data-test-id="tax-calculator__tax-result-slip--facts">
			<div v-for="fact in facts" :key="fact.id" class="flex justify-between gap-4" :data-test-id="`tax-calculator__tax-result-slip--${fact.id}`">
				<dt class="text-gray-500">{{ fact.label }}</dt>
				<dd class="tabular-nums text-gray-800">{{ fact.value }}</dd>
			</div>
		</dl>

		<!-- Full calculation, folded. Same rows and wording as TaxSummary, minus the final row (it would repeat the amount) -->
		<div class="px-4 py-3 mx-2 mb-2 space-y-3 text-sm" data-test-id="tax-calculator__tax-result-slip--breakdown">
			<button
				type="button"
				class="flex w-full items-center justify-between min-h-[44px] -my-3"
				:aria-expanded="showBreakdown"
				data-test-id="tax-calculator__tax-result-slip--breakdown-toggle"
				data-fn-action="tax_result_breakdown_toggle"
				@click="showBreakdown = !showBreakdown"
			>
				<span class="text-gray-600 font-bold">ดูการคำนวณทั้งหมด</span>
				<i :class="showBreakdown ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-500 text-sm" aria-hidden="true"></i>
			</button>

			<template v-if="showBreakdown">
				<div class="flex justify-between pt-3">
					<span class="text-gray-500">รายได้ทั้งปี</span>
					<span>{{ money(calculationData.totalIncome) }}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-500">หัก ค่าใช้จ่าย</span>
					<span>{{ money(calculationData.totalExpenses) }}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-500">หัก ค่าลดหย่อน</span>
					<span>{{ money(calculationData.totalDeductions) }}</span>
				</div>
				<div class="flex justify-between border-b border-gray-300 pb-4">
					<span class="text-gray-600 font-bold">เงินได้สุทธิ</span>
					<span class="font-semibold">{{ money(calculationData.taxableIncome) }}</span>
				</div>
				<!-- With nothing withheld, tax on net income IS the amount above, so only the bracket toggle stays -->
				<button
					type="button"
					class="flex w-full justify-between cursor-pointer text-left"
					:aria-expanded="showBrackets"
					data-test-id="tax-calculator__tax-result-slip--brackets-toggle"
					@click="showBrackets = !showBrackets"
				>
					<span class="flex items-center gap-2">
						<span class="text-gray-500">{{ withheld ? 'ภาษีจากเงินได้สุทธิ' : 'ภาษีแยกตามขั้นเงินได้' }}</span>
						<i :class="showBrackets ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-500 text-sm" aria-hidden="true"></i>
					</span>
					<span v-if="withheld">{{ money(calculationData.taxAmount) }}</span>
				</button>
				<div v-show="showBrackets" class="bg-gray-100 rounded-lg p-4" data-test-id="tax-calculator__tax-result-slip--brackets">
					<div class="flex justify-between border-b border-gray-300 pb-4">
						<span class="text-gray-500">อัตราภาษีเงินได้บุคคลธรรมดา</span>
					</div>
					<div
						v-for="(bracket, index) in brackets"
						:key="index"
						class="flex justify-between pt-4"
						:data-test-id="`tax-calculator__tax-result-slip--bracket-row-${index}`"
					>
						<div class="flex flex-col">
							<span class="text-gray-600 font-medium">{{ bracket.label }}</span>
							<span class="text-gray-400">{{ bracket.range }}</span>
						</div>
						<span>{{ formatCurrencyTHB(bracket.taxAmount) }}</span>
					</div>
				</div>
				<div v-if="withheld" class="flex justify-between">
					<span class="text-gray-500">หัก ภาษีหัก ณ ที่จ่าย</span>
					<span>{{ money(calculationData.withholdingTax) }}</span>
				</div>
			</template>
		</div>

		<p class="px-6 py-3 bg-gray-50 text-xs text-gray-400 border-t border-gray-200" data-test-id="tax-calculator__tax-result-slip--footer">
			ประมาณการเบื้องต้น จากข้อมูลที่คุณกรอก · ใช้ตรวจสอบก่อนยื่นแบบ ไม่ใช่เอกสารทางภาษี
		</p>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatCurrencyTHB, formatCurrencyTHBWithDecimals } from '~/utils/format'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import { useResultEmojiVariant, usageEmoji, usageHintText } from '~/composables/useResultEmojiVariant'

const props = defineProps({
	// The user's own result, without RMF/ThaiESG planning
	calculationData: {
		type: Object,
		required: true
	}
})

const { calculateTaxSummary, getDeductionUsage } = useTaxCalculator()

const showBreakdown = ref(false)
const showBrackets = ref(false)

const money = (amount) => formatCurrencyTHBWithDecimals(amount)

const summary = computed(() => calculateTaxSummary(props.calculationData, {}, 0, 0))
const topRate = computed(() => summary.value.maxTaxRate)
const brackets = computed(() => summary.value.taxBreakdown)
const withheld = computed(() => (props.calculationData.withholdingTax || 0) > 0)

// Status label, amount and explanation, using the shared result wording
const result = computed(() => {
	const net = props.calculationData.netTaxPayable || 0
	const withheldText = formatCurrencyTHB(props.calculationData.withholdingTax || 0)

	if (Math.abs(net) < 0.005) {
		return {
			kind: 'zero',
			emoji: '🙂',
			label: 'ผลภาษีปีนี้',
			amount: 'ไม่ต้องจ่ายภาษีเพิ่ม',
			explanation: withheld.value
				? 'ปีภาษี 2569 ภาษีที่ถูกหัก ณ ที่จ่ายไว้ เท่ากับภาษีทั้งปีของคุณพอดี'
				: 'ปีภาษี 2569 เงินได้สุทธิของคุณยังไม่ถึงเกณฑ์ที่ต้องเสียภาษี'
		}
	}

	if (net < 0) {
		return {
			kind: 'refund',
			emoji: '😄',
			label: 'ภาษีที่ได้คืน',
			amount: formatCurrencyTHBWithDecimals(-net),
			explanation: `ปีภาษี 2569 คุณจะได้รับเงินภาษีคืน เพราะภาษีที่ถูกหัก ณ ที่จ่ายไว้ (${withheldText} บาท) มากกว่าภาษีทั้งปี`
		}
	}

	return {
		kind: 'payable',
		emoji: '😢',
		label: 'ภาษีที่ต้องจ่ายเพิ่ม',
		amount: formatCurrencyTHBWithDecimals(net),
		explanation: withheld.value
			? `ปีภาษี 2569 คุณต้องจ่ายภาษีเพิ่มตามยอดนี้ หลังหักภาษีที่ถูกหัก ณ ที่จ่ายไว้แล้ว ${withheldText} บาท`
			: 'ปีภาษี 2569 คุณต้องจ่ายภาษีเพิ่มตามยอดนี้ (ยังไม่ได้หักภาษีที่ถูกหัก ณ ที่จ่าย เพราะยังไม่ได้กรอก)'
	}
})

const { variant: emojiVariant } = useResultEmojiVariant()
const usage = computed(() => getDeductionUsage(props.calculationData))
const emoji = computed(() => (emojiVariant.value === 'ticket' ? result.value.emoji : usageEmoji[usage.value.level]))
const usageHint = computed(() => usageHintText(usage.value))


const facts = computed(() => [
	{ id: 'total-income', label: 'รายได้ทั้งปี', value: money(props.calculationData.totalIncome) },
	{ id: 'total-deductions', label: 'ค่าลดหย่อนที่ใช้', value: money(props.calculationData.totalDeductions) },
	{ id: 'taxable-income', label: 'เงินได้สุทธิ', value: money(props.calculationData.taxableIncome) }
])
</script>

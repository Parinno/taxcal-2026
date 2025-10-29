<template>
	<div
		v-if="open"
		class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
		aria-modal="true"
		role="dialog"
	>
		<!-- Backdrop -->
		<div class="absolute inset-0 bg-black bg-opacity-40" @click="close"></div>

		<!-- Modal Content -->
		<div class="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-lg p-4 sm:p-6 m-0 sm:m-4">
			<!-- Header -->
			<div class="flex items-start justify-between">
				<div>
					<div class="text-base font-bold text-gray-800">คำนวณสัดส่วนการลงทุน</div>
                    <div class="my-3 border-b border-gray-200"></div>
					<div class="font-medium text-gray-800 my-2" v-if="combo">{{ combo.comboName }}</div>
					<!-- Risk Indicator Blocks -->
                    <div class="flex items-center gap-2">
                        <div class="flex gap-0.5">
                            <div
                                v-for="i in 3"
                                :key="i"
                                :class="[
                                    riskLevelStyle(i),
                                    i <= combo.risk ? riskColors[combo.risk - 1] : 'bg-gray-200'
                                ]"
                            ></div>
                        </div>                    
                        <!-- Risk Level Text -->
                        <span class="text-sm text-gray-500">
                            {{ riskLabels[combo.risk - 1] }}
                        </span>
                    </div>
				
                    <div class="text-gray-400 text-xs mt-2">∗ กรุณาศึกษาค่าธรรมเนียมกองทุนเพิ่มเติมในหนังสือชี้ชวนก่อนทำรายการ เนื่องจากค่าธรรมเนียมอาจมีการเปลี่ยนแปลงและอาจมีค่าธรรมเนียมอื่น ๆ เพิ่มเติม</div>
				</div>
				<button class="text-gray-400 hover:text-gray-600" @click="close">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Body -->
			<div class="mt-4">
				<label class="block text-sm text-gray-600 mb-1">จำนวนเงินที่ต้องการลงทุน (฿)</label>
				<div class="w-full">
					<input
						v-model="displayAmount"
						type="text"
						inputmode="numeric"
						pattern="[0-9,]*"
						placeholder="เช่น 10,000"
						class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
						@input="onAmountInput"
					/>
					<div class="flex gap-2 mt-2">
						<button
							class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
							@click="quickFill(500)"
						>+500</button>
						<button
							class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
							@click="quickFill(1000)"
						>+1,000</button>
						<button
							class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
							@click="quickFill(10000)"
						>+10,000</button>
						<button
							class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
							@click="quickFill(100000)"
						>+100,000</button>
					</div>
				</div>

				<!-- Allocation Table -->
				<div class="mt-4 border border-gray-200 rounded-lg overflow-hidden" v-if="combo">
					<table class="w-full text-sm">
						<thead>
							<tr class="bg-gray-50">
								<th class="text-left px-3 py-2 text-gray-600">กองทุน</th>
								<th class="text-right px-3 py-2 text-gray-600">สัดส่วน</th>
								<th class="text-right px-3 py-2 text-gray-600">จำนวนเงิน (฿)</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="fund in combo.funds" :key="fund.fundName" class="border-t border-gray-100">
								<td class="px-3 py-2">
									<div class="flex items-center gap-2">
										<span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">RMF</span>
										<div>
											<div class="font-medium text-gray-800">{{ fund.fundName }}</div>
											<div class="text-xs text-gray-500 mt-1">{{ fund.assetClass }}</div>
										</div>
									</div>
								</td>
								<td class="px-3 py-2 text-right text-gray-700">{{ fund.percentage }}%</td>
								<td class="px-3 py-2 text-right font-medium text-gray-800">{{ formatCurrency(calcAllocation(fund.percentage)) }}</td>
							</tr>
							<tr class="bg-gray-50 border-t border-gray-200">
								<td class="px-3 py-2 font-medium text-gray-800">รวม</td>
								<td class="px-3 py-2 text-right text-gray-700">100%</td>
								<td class="px-3 py-2 text-right font-semibold text-gray-900">{{ formatCurrency(totalAllocated) }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Footer -->
			<div class="mt-5 flex items-center justify-end gap-2">
				<button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" @click="close">ยกเลิก</button>
				<button
					class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
					:disabled="!canConfirm"
					@click="confirm"
				>
					ยืนยันการจัดสรร
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { formatCurrencyTHBWithDecimals, formatNumberWithSeparators, parseNumberFromFormatted, sanitizeAndFormatNumberInput } from '~/utils/format'

const props = defineProps({
	open: { type: Boolean, default: false },
	combo: { type: Object, default: null },
	defaultAmount: { type: Number, default: 0 }
})

const riskColors = ['bg-green-500', 'bg-orange-500', 'bg-red-500']
const riskLabels = ['เสี่ยงต่ำ', 'เสี่ยงกลาง', 'เสี่ยงสูง']

const emit = defineEmits(['update:open', 'confirm'])

const investmentAmount = ref(props.defaultAmount)
const displayAmount = ref('')

// Update display when investment amount changes
watch(investmentAmount, (newVal) => {
	displayAmount.value = formatNumberWithSeparators(newVal)
}, { immediate: true })

// Update investment amount when display changes
watch(displayAmount, (newVal) => {
	const parsed = parseNumberFromFormatted(newVal)
	if (parsed !== investmentAmount.value) {
		investmentAmount.value = parsed
	}
})

watch(
	() => props.open,
	(newVal) => {
		if (newVal) {
			investmentAmount.value = props.defaultAmount
			// Lock body scroll when modal opens
			document.body.classList.add('overflow-hidden')
		}
		// Unlock when closed
		else {
			document.body.classList.remove('overflow-hidden')
		}
	}
)

const riskLevelStyle = (index) => {
	switch (index) {
		case 1:
			return 'w-4 h-2 rounded-l-full'
		case 3:
			return 'w-4 h-2 rounded-r-full'
		default:
			return 'w-4 h-2'
	}
}

const close = () => emit('update:open', false)

const calcAllocation = (percentage) => {
	const amount = (Number(investmentAmount.value) || 0) * (Number(percentage) || 0) / 100
	return Math.max(0, Math.round(amount * 100) / 100)
}

const totalAllocated = computed(() => {
	if (!props.combo) return 0
	return props.combo.funds.reduce((sum, f) => sum + calcAllocation(f.percentage), 0)
})

const formatCurrency = (amount) => formatCurrencyTHBWithDecimals(amount)

const quickFill = (plus) => {
	const base = Number(investmentAmount.value) || 0
	investmentAmount.value = base + plus
}

const canConfirm = computed(() => !!props.combo && (Number(investmentAmount.value) || 0) > 0)

const confirm = () => {
	if (!canConfirm.value || !props.combo) return
	const allocations = props.combo.funds.map((f) => ({
		fundName: f.fundName,
		percentage: f.percentage,
		amount: calcAllocation(f.percentage)
	}))
	emit('confirm', {
		comboId: props.combo.comboId,
		comboName: props.combo.comboName,
		investmentAmount: Number(investmentAmount.value) || 0,
		allocations
	})
	close()
}

// Sanitize input to allow only digits and commas, then normalize formatting
const onAmountInput = (e) => {
    displayAmount.value = sanitizeAndFormatNumberInput(e.target.value)
}

onBeforeUnmount(() => {
	document.body.classList.remove('overflow-hidden')
})
</script>

<style scoped>
</style>



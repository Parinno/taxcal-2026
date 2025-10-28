<template>
	<div class="bg-white">
		<!-- Header -->
		<div class="text-2xl font-bold text-gray-800 mb-4">กองทุนภาษีแนะนำ</div>

		<!-- Tabs -->
		<div class="flex border-b border-gray-200 mb-4">
			<button
				@click="activeTab = 'rmf'"
				:class="[
					'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
					activeTab === 'rmf'
						? 'text-gray-800 border-gray-800'
						: 'text-gray-500 border-transparent hover:text-gray-700'
				]"
			>
				RMF
			</button>
			<button
				@click="activeTab = 'thaiEsg'"
				:class="[
					'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
					activeTab === 'thaiEsg'
						? 'text-gray-800 border-gray-800'
						: 'text-gray-500 border-transparent hover:text-gray-700'
				]"
			>
				ThaiESG
			</button>
		</div>

		<!-- RMF Sub Tabs -->
		<div v-if="activeTab === 'rmf'" class="flex mb-4 space-x-2">
			<button
				@click="rmfSubTab = 'individual'"
				:class="[
					'px-4 py-2 text-sm font-medium border-2 p-2 rounded transition-colors focus:outline-none',
					rmfSubTab === 'individual'
						? 'text-white bg-gray-800 border-gray-800 shadow'
						: 'text-gray-500 border-gray-700 bg-white hover:text-gray-700 hover:bg-gray-50'
				]"
			>
				เลือก 1 กองทุน
			</button>
			<button
				@click="rmfSubTab = 'combo'"
				:class="[
					'px-4 py-2 text-sm font-medium border-2 p-2 rounded transition-colors focus:outline-none',
					rmfSubTab === 'combo'
						? 'text-white bg-gray-800 border-gray-800 shadow'
						: 'text-gray-500 border-gray-700 bg-white hover:text-gray-700 hover:bg-gray-50'
				]"
			>
				เลือกชุดกองทุน
			</button>
		</div>

		<!-- Loading State -->
		<div v-if="loading" class="text-center py-8">
			<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
			<div class="mt-2 text-sm text-gray-600">กำลังโหลดข้อมูลกองทุน...</div>
		</div>

		<!-- Error State -->
		<div v-else-if="hasError" class="text-center py-8">
			<div class="text-red-600 mb-2">
				<svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<div class="text-sm text-gray-600 mb-4">ไม่สามารถโหลดข้อมูลได้</div>
			<button
				@click="refetchData"
				class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
			>
				ลองใหม่
			</button>
		</div>

		<!-- Fund List - ThaiESG Funds -->
		<div v-else-if="activeTab === 'thaiEsg'" class="space-y-0">
			<div v-if="thaiEsgFunds.length === 0" class="text-sm text-gray-500 py-6 text-center">
				ไม่พบข้อมูลกองทุน
			</div>
			<div
				v-for="fund in thaiEsgFunds"
				:key="fund.id"
				class="py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors group"
				:title="`ดูข้อมูลกองทุน ${fund.name} ใน Finnomena`"
				@click="handleFundClick(fund)"
			>
				<!-- Fund Name -->
				<div class="font-bold text-gray-800 mb-1 flex flex-row items-center gap-2">
					<span>{{ fund.name }}</span>
					<span
						v-if="fund.creditCardSupported"
						class="text-xs bg-gray-200 px-2 py-0.5 rounded border"
					>
						รองรับ
						<i class="fas fa-credit-card"></i>
					</span>
					<!-- External link icon -->
					<svg
						class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</div>

				<!-- Details Line -->
				<div class="flex items-center gap-3">
					<!-- Stock Type -->
					<span class="text-sm text-gray-500 pr-2 border-r-2 border-gray-200">
						{{ fund.stockType }}
					</span>
					<!-- Risk Indicator Blocks -->
					<div class="flex gap-0.5">
						<div
							v-for="i in 3"
							:key="i"
							:class="[
								riskLevelStyle(i),
								i <= fund.riskLevel ? riskColors[fund.riskLevel - 1] : 'bg-gray-200'
							]"
						></div>
					</div>
					<!-- Risk Level Text -->
					<span class="text-sm text-gray-500">
						{{ riskLabels[fund.riskLevel - 1] }}
					</span>
				</div>
			</div>
		</div>

		<!-- Fund List - Individual RMF -->
		<div v-else-if="rmfSubTab === 'individual'" class="space-y-0">
			<div v-if="rmfFunds.length === 0" class="text-sm text-gray-500 py-6 text-center">
				ไม่พบข้อมูลกองทุน
			</div>
			<div
				v-for="fund in rmfFunds"
				:key="fund.id"
				class="py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors group"
				:title="`ดูข้อมูลกองทุน ${fund.name} ใน Finnomena`"
				@click="handleFundClick(fund)"
			>
				<!-- Fund Name -->
				<div class="font-bold text-gray-800 mb-1 flex flex-row items-center gap-2">
					<span>{{ fund.name }}</span>
					<span
						v-if="fund.creditCardSupported"
						class="text-xs bg-gray-200 px-2 py-0.5 rounded border"
					>
						รองรับ
						<i class="fas fa-credit-card"></i>
					</span>
					<!-- External link icon -->
					<svg
						class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</div>

				<!-- Details Line -->
				<div class="flex items-center gap-3">
					<!-- Stock Type -->
					<span class="text-sm text-gray-500 pr-2 border-r-2 border-gray-200">
						{{ fund.stockType }}
					</span>
					<!-- Risk Indicator Blocks -->
					<div class="flex gap-0.5">
						<div
							v-for="i in 3"
							:key="i"
							:class="[
								riskLevelStyle(i),
								i <= fund.riskLevel ? riskColors[fund.riskLevel - 1] : 'bg-gray-200'
							]"
						></div>
					</div>
					<!-- Risk Level Text -->
					<span class="text-sm text-gray-500">
						{{ riskLabels[fund.riskLevel - 1] }}
					</span>
				</div>
			</div>
		</div>

		<!-- Fund List - RMF Combo -->
		<div v-else-if="rmfSubTab === 'combo'" class="space-y-4">
			<div v-if="rmfCombos.length === 0" class="text-sm text-gray-500 py-6 text-center">
				ไม่พบชุดกองทุน
			</div>
			<div
				v-for="combo in rmfCombos"
				:key="combo.comboId"
				class="border border-gray-200 rounded-lg p-4"
			>
				<!-- Combo Header -->
				<div class="items-center mb-4">
					<div class="text-base font-bold text-gray-800">{{ combo.comboName }}</div>
					<div class="flex items-center mt-2 gap-2">
						<!-- Risk Indicator Blocks -->
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
						<span class="text-sm text-gray-600">{{ riskLabels[combo.risk - 1] }}</span>
					</div>
				</div>

				<!-- Combo Funds Table -->
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-gray-200">
								<th class="text-left py-2 font-medium text-gray-600">กองทุน</th>
								<th class="text-left py-2 font-medium text-gray-600">บลจ.</th>
								<th class="text-left py-2 font-medium text-gray-600">ประเภท</th>
								<th class="text-right py-2 font-medium text-gray-600">สัดส่วน</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="fund in combo.funds"
								:key="fund.fundName"
								class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
								@click="handleComboFundClick(fund)"
							>
								<td class="py-3">
									<div class="flex items-center gap-2">
										<span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">RMF</span>
										<div>
											<div class="font-medium text-gray-800 mb-1">
												{{ fund.fundName }}
												<span
													v-if="fund.creditCardSupported"
													class="text-xs bg-gray-200 px-2 py-0.5 rounded border"
												>
													รองรับ
													<i class="fas fa-credit-card"></i>
												</span>
											</div>
											<div class="text-xs text-gray-500 mt-2">{{ fund.fundFullName }}</div>
										</div>
									</div>
								</td>
								<td class="py-3 text-gray-600">{{ fund.amcName }}</td>
								<td class="py-3 text-gray-600">{{ fund.assetClass }}</td>
								<td class="py-3 text-right font-medium text-gray-800">{{ fund.percentage }}%</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-else class="text-center py-8">
			<div class="text-gray-400 mb-2">
				<svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
			</div>
			<div class="text-sm text-gray-600">ไม่พบข้อมูลกองทุน</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useFundRecommendations } from '~/composables/useFundRecommendations'

const props = defineProps({
	onFundClick: {
		type: Function,
		default: () => {}
	},
	onViewAll: {
		type: Function,
		default: () => {}
	}
})

const emit = defineEmits(['fundClick', 'viewAll'])

const activeTab = ref('rmf')
const rmfSubTab = ref('individual')

// Use the fund recommendations composable
const {
	rmfFunds,
	rmfCombos,
	thaiEsgFunds,
	loading,
	error,
	fetchRmfFunds,
	fetchThaiEsgFunds,
	fetchAllFunds,
	hasRmfFunds,
	hasThaiEsgFunds,
	hasError
} = useFundRecommendations()

// Risk level configuration
const riskColors = ['bg-green-500', 'bg-orange-500', 'bg-red-500']
const riskLabels = ['เสี่ยงต่ำ', 'เสี่ยงกลาง', 'เสี่ยงสูง']

const currentFunds = computed(() => {
	return activeTab.value === 'thaiEsg' ? thaiEsgFunds.value : rmfFunds.value
})

// Fetch data when component mounts
onMounted(async () => {
	await fetchAllFunds()
})

// Refetch data function for error retry
const refetchData = async () => {
	if (activeTab.value === 'thaiEsg') {
		await fetchThaiEsgFunds()
	} else {
		await fetchRmfFunds()
	}
}

// Watch for tab changes and fetch data if needed
watch(activeTab, async (newTab) => {
	if (newTab === 'rmf' && rmfFunds.value.length === 0) {
		await fetchRmfFunds()
	} else if (newTab === 'thaiEsg' && thaiEsgFunds.value.length === 0) {
		await fetchThaiEsgFunds()
	}
})

const handleFundClick = (fund) => {
	// Get runtime config for Finnomena website URL
	const config = useRuntimeConfig()

	// Open Finnomena fund page in new tab
	const fundUrl = `${config.public.finnomenaWebsiteUrl}/fund/${encodeURIComponent(fund.name)}`
	window.open(fundUrl, '_blank', 'noopener,noreferrer')

	// Emit event for parent component
	emit('fundClick', fund)
	if (props.onFundClick) {
		props.onFundClick(fund)
	}
}

const handleComboFundClick = (fund) => {
	// Get runtime config for Finnomena website URL
	const config = useRuntimeConfig()

	// Open Finnomena fund page in new tab
	const fundUrl = `${config.public.finnomenaWebsiteUrl}/fund/${encodeURIComponent(fund.fundName)}`
	window.open(fundUrl, '_blank', 'noopener,noreferrer')

	// Emit event for parent component
	emit('fundClick', fund)
	if (props.onFundClick) {
		props.onFundClick(fund)
	}
}

const handleViewAll = () => {
	emit('viewAll', activeTab.value)
	if (props.onViewAll) {
		props.onViewAll(activeTab.value)
	}
}

const riskLevelStyle = (index) => {
	console.log(index)
	switch (index) {
		case 1:
			return 'w-4 h-2 rounded-l-full'
		case 3:
			return 'w-4 h-2 rounded-r-full'
		default:
			return 'w-4 h-2'
	}
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>

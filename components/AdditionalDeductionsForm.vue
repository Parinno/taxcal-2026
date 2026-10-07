<template>
	<div class="max-w-2xl mx-auto" data-fn-location="additional-deductions-form">
		<!-- Pick first: only the items the user has get a field -->
		<div
			class="mb-[20px]"
			data-test-id="tax-calculator__additional-deductions-form--section"
		>
			<h2
				class="font-bold text-color-primary text-[20px]"
				data-test-id="tax-calculator__additional-deductions-form--title"
			>
				ค่าลดหย่อนเพิ่มเติม
			</h2>
			<p class="text-[15px] text-color-secondary mt-1 mb-[16px]">
				ปีนี้คุณจ่ายรายการไหนบ้าง เลือกได้หลายข้อ ไม่มีก็กดถัดไปได้เลย
			</p>

			<div
				v-for="section in visibleSections"
				:key="section.testId"
				class="mb-[16px]"
				:data-test-id="`tax-calculator__additional-deductions-form--${section.testId}-picker`"
			>
				<p class="text-[13px] font-medium text-color-secondary mb-2">{{ section.title }}</p>
				<div class="flex flex-wrap gap-2">
					<button
						v-for="field in section.fields"
						:key="field.key"
						type="button"
						:aria-pressed="picked.has(field.key)"
						:class="['pick-chip', picked.has(field.key) && 'pick-chip--on']"
						:data-test-id="`tax-calculator__additional-deductions-form--${field.testId}-chip`"
						:data-fn-action="`deduction_${field.key}_pick`"
						@click="togglePick(field.key)"
					>
						<i :class="['fa-solid text-[12px]', picked.has(field.key) ? 'fa-check' : 'fa-plus']"></i>
						{{ field.chip }}
					</button>
				</div>
			</div>

			<div v-if="pickedFields.length" class="space-y-6 pt-[16px] mt-[8px] border-t border-[#e9eff2]">
				<div v-for="field in pickedFields" :key="field.key">
					<DeductionField :field="field" :model="modelValue" test-prefix="tax-calculator__additional-deductions-form" />
					<p
						v-if="deductedNote(field)"
						class="mt-1 ml-5 text-[15px] font-medium text-color-primary"
						:data-test-id="`tax-calculator__additional-deductions-form--${field.testId}-deducted`"
					>
						{{ deductedNote(field) }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DeductionField from '~/components/DeductionField.vue'

const props = defineProps({
	modelValue: {
		type: Object,
		required: true
	},
	// What each field actually takes off after its cap, from calculateTaxFromForms
	deducted: {
		type: Object,
		default: undefined
	}
})

defineEmits(['update:modelValue', 'submit', 'back'])

// Tax year 2569 rules
const sections = [
	{
		testId: 'insurance',
		title: 'ประกัน',
		fields: [
			{ key: 'lifeInsurance', testId: 'lifeInsurance', chip: 'ประกันชีวิต', label: 'เบี้ยประกันชีวิต', info: 'ไม่เกิน 100,000 บาท', kind: 'amount' },
			{
				key: 'healthInsurance',
				testId: 'healthInsurance',
				chip: 'ประกันสุขภาพ',
				label: 'เบี้ยประกันสุขภาพตนเอง',
				info: 'ไม่เกิน 25,000 บาท และเมื่อรวมกับประกันชีวิตไม่เกิน 100,000 บาท',
				kind: 'amount'
			},
			{
				key: 'parentHealthInsurance',
				testId: 'parentHealthInsurance',
				chip: 'ประกันสุขภาพพ่อแม่',
				label: 'เบี้ยประกันสุขภาพพ่อแม่',
				info: 'รวมกันไม่เกิน 15,000 บาท',
				kind: 'amount'
			},
			{
				key: 'spouseLifeInsurance',
				testId: 'spouseLifeInsurance',
				chip: 'ประกันชีวิตคู่สมรส',
				label: 'เบี้ยประกันชีวิตคู่สมรสที่ไม่มีรายได้',
				info: 'ไม่เกิน 10,000 บาท',
				kind: 'amount',
				showIf: (data) => data.hasSpouseWithoutIncome
			}
		]
	},
	{
		testId: 'home-measures',
		title: 'บ้านและมาตรการรัฐ',
		fields: [
			{ key: 'homeLoanInterest', testId: 'homeLoanInterest', chip: 'ดอกเบี้ยบ้าน', label: 'ดอกเบี้ยเงินกู้ยืมเพื่อที่อยู่อาศัย', info: 'ไม่เกิน 100,000 บาท', kind: 'amount' },
			{
				key: 'solarRooftop',
				testId: 'solarRooftop',
				chip: 'Solar Rooftop',
				label: 'ค่าติดตั้ง Solar Rooftop',
				info: 'ไม่เกิน 200,000 บาท ใช้สิทธิ์ได้ครั้งเดียว ในปีที่เชื่อมต่อระบบสำเร็จ (2569-2571)',
				kind: 'amount'
			},
			{ key: 'artwork', testId: 'artwork', chip: 'งานศิลปะ', label: 'ซื้องานศิลปะทัศนศิลป์', info: 'ไม่เกิน 100,000 บาท (2568-2570)', kind: 'amount' },
			{
				key: 'socialEnterprise',
				testId: 'socialEnterprise',
				chip: 'วิสาหกิจเพื่อสังคม',
				label: 'ลงทุนในวิสาหกิจเพื่อสังคม',
				info: 'ไม่เกิน 100,000 บาท',
				kind: 'amount'
			}
		]
	},
	{
		testId: 'donation',
		title: 'เงินบริจาค',
		fields: [
			{
				key: 'doubleDonation',
				testId: 'doubleDonation',
				chip: 'บริจาคการศึกษา กีฬา รพ.รัฐ',
				label: 'บริจาคเพื่อการศึกษา กีฬา โรงพยาบาลรัฐ',
				info: 'กรอกยอดที่บริจาคจริง ระบบหักให้ 2 เท่า ไม่เกิน 10% ของเงินได้หลังหักค่าใช้จ่ายและค่าลดหย่อน',
				kind: 'amount'
			},
			{
				key: 'donation',
				testId: 'donation',
				chip: 'บริจาคทั่วไป',
				label: 'บริจาคทั่วไป',
				info: 'ไม่เกิน 10% ของเงินได้ที่เหลือ หลังหักเงินบริจาค 2 เท่า',
				kind: 'amount'
			},
			{ key: 'partyDonation', testId: 'partyDonation', chip: 'บริจาคพรรคการเมือง', label: 'บริจาคพรรคการเมือง', info: 'ไม่เกิน 10,000 บาท', kind: 'amount' }
		]
	}
]

const visibleSections = computed(() =>
	sections.map((section) => ({
		...section,
		fields: section.fields.filter((field) => !field.showIf || field.showIf(props.modelValue))
	}))
)

// Items already filled stay open when the user comes back to this step
const allFields = sections.flatMap((section) => section.fields)
const picked = ref(new Set(allFields.filter((field) => Number(props.modelValue[field.key]) > 0).map((field) => field.key)))

const pickedFields = computed(() =>
	visibleSections.value.flatMap((section) => section.fields).filter((field) => picked.value.has(field.key))
)

// Unpicking clears the amount, so nothing hidden still counts
const togglePick = (key) => {
	const next = new Set(picked.value)
	if (next.has(key)) {
		next.delete(key)
		props.modelValue[key] = ''
	} else {
		next.add(key)
	}
	picked.value = next
}

// Shown only when the cap cuts the entry, or for the 2x donation where the deduction differs from what was paid
const deductedNote = (field) => {
	const entered = Number(props.modelValue[field.key]) || 0
	const deducted = Math.round(props.deducted?.[field.key] ?? 0)
	if (!entered) return ''
	if (field.key === 'doubleDonation') return `ลดหย่อนได้ ${deducted.toLocaleString()} บาท`
	if (deducted < entered) return `ลดหย่อนได้ ${deducted.toLocaleString()} บาท ส่วนที่เกินเพดานไม่นับ`
	return ''
}
</script>

<style scoped>
.pick-chip {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	min-height: 40px;
	padding: 0 14px;
	border-radius: 200px;
	border: 1px solid #d3dfe6;
	background: #fff;
	color: var(--color-primary);
	font-size: 15px;
	font-weight: 500;
	transition: background 0.2s ease, border-color 0.2s ease;
}

.pick-chip:hover {
	border-color: var(--color-primary);
}

.pick-chip--on {
	background: #e9eff2;
	border-color: var(--color-primary);
}
</style>

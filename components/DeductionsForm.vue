<template>
	<div class="max-w-2xl mx-auto" data-fn-location="deductions-form">
		<div
			v-for="(section, index) in visibleSections"
			:key="section.testId"
			:class="['space-y-6 mb-[20px]', index > 0 && 'pt-[16px]']"
			:data-test-id="`tax-calculator__deductions-form--${section.testId}-section`"
		>
			<div class="flex items-center justify-between gap-4 mb-[16px] md:w-[648px]">
				<h2
					class="font-bold text-color-primary text-[20px]"
					:data-test-id="`tax-calculator__deductions-form--${section.testId}-title`"
				>
					{{ section.title }}
				</h2>
				<button
					v-if="maxValues && section.maxFields"
					type="button"
					class="text-[15px] font-medium text-color-primary underline shrink-0"
					:data-test-id="`tax-calculator__deductions-form--${section.testId}-max-button`"
					:data-fn-action="`deduction_${section.testId}_max`"
					@click="section.maxFields.forEach(fillMax)"
				>
					ใช้สิทธิ์สูงสุด
				</button>
			</div>
			<DeductionField
				v-for="field in section.fields"
				:key="field.key"
				:field="field"
				:model="formData"
				test-prefix="tax-calculator__deductions-form"
			/>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import DeductionField from '~/components/DeductionField.vue'

const props = defineProps({
	modelValue: {
		type: Object,
		required: true
	},
	// Per-field max from getDeductionMaxes; prefill buttons are hidden when absent
	maxValues: {
		type: Object,
		default: undefined
	}
})

const emit = defineEmits(['update:modelValue', 'submit', 'back'])

// Two-way binding helper
const formData = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val)
})

// Tax year 2569 rules. Family fields ask for facts the user knows; the calculator turns them into baht
const sections = [
	{
		testId: 'family',
		title: 'ส่วนตัวและครอบครัว',
		fields: [
			{
				key: 'personalDeduction',
				testId: 'personal-deduction',
				label: 'ลดหย่อนส่วนบุคคล',
				// Shows the spouse allowance too; the calculator still counts it once, under family
				shownValue: (data) => 60000 + (data.hasSpouseWithoutIncome ? 60000 : 0),
				info: (data) =>
					data.hasSpouseWithoutIncome
						? 'ตัวคุณ 60,000 บาท + คู่สมรสที่ไม่มีรายได้ 60,000 บาท ระบบใส่ให้แล้ว'
						: 'ผู้เสียภาษีทุกคนได้ 60,000 บาท ระบบใส่ให้แล้ว',
				kind: 'amount',
				disabled: true
			},
			// Sits close under the personal deduction: both are about who you are
			{
				key: 'hasSpouseWithoutIncome',
				testId: 'spouse',
				label: 'มีคู่สมรสที่ไม่มีรายได้',
				info: 'จดทะเบียนสมรส ลดหย่อนได้ 60,000 บาท',
				kind: 'toggle',
				class: '!mt-2'
			},
			{
				key: 'childrenBornBefore2561Count',
				testId: 'children-born-before-2561-count',
				label: 'บุตรที่เกิดก่อนปี 2561',
				info: 'คนละ 30,000 บาท',
				kind: 'count',
				max: 10
			},
			{
				key: 'childrenBornFrom2561Count',
				testId: 'children-born-from-2561-count',
				label: 'บุตรที่เกิดตั้งแต่ปี 2561',
				info: 'บุตรคนแรก 30,000 บาท คนที่ 2 ขึ้นไป คนละ 60,000 บาท',
				kind: 'count',
				max: 10
			},
			{
				key: 'maternityExpense',
				testId: 'maternity-expense',
				label: 'ค่าฝากครรภ์และคลอดบุตร',
				info: 'ไม่เกิน 60,000 บาทต่อครรภ์',
				kind: 'amount'
			},
			{
				key: 'ownParentsCount',
				testId: 'own-parents-count',
				label: 'พ่อแม่ที่คุณเลี้ยงดู',
				info: 'อายุ 60 ปีขึ้นไป และมีรายได้ไม่ถึง 30,000 บาทต่อปี คนละ 30,000 บาท',
				kind: 'count',
				max: 2
			},
			{
				key: 'spouseParentsCount',
				testId: 'spouse-parents-count',
				label: 'พ่อแม่ของคู่สมรสที่คุณเลี้ยงดู',
				info: 'เงื่อนไขเดียวกับพ่อแม่ของคุณ คนละ 30,000 บาท',
				kind: 'count',
				showIf: (data) => data.hasSpouseWithoutIncome,
				max: 2
			},
			{
				key: 'disabledDependentsCount',
				testId: 'disabled-dependents-count',
				label: 'ผู้พิการหรือทุพพลภาพที่คุณดูแล',
				info: 'มีรายได้ไม่เกิน 30,000 บาทต่อปี คนละ 60,000 บาท',
				kind: 'count',
				max: 10
			}
		]
	},
	{
		testId: 'savings-investment',
		title: 'การออมและการลงทุน',
		// Filled by the section's "ใช้สิทธิ์สูงสุด" button
		maxFields: ['socialSecurity', 'providentFund'],
		fields: [
			{ key: 'socialSecurity', testId: 'social-security', label: 'เงินประกันสังคม', info: 'ไม่เกิน 10,500 บาท', kind: 'amount' },
			{
				key: 'providentFund',
				testId: 'provident-fund',
				label: 'กองทุนกลุ่มเกษียณ ยังไม่รวม RMF (กองทุนสำรองเลี้ยงชีพ, กบข, กอช, ประกันบำนาญ)',
				info: 'ไม่เกิน 500,000 บาท (ไม่รวมเงินสมทบจากนายจ้าง)',
				kind: 'amount'
			},
			{
				key: 'ltfSwitchedAmount',
				testId: 'thai-esgx-transferred',
				label: 'ยอดที่สับเปลี่ยนจาก LTF ไป ThaiESGX',
				info: 'ระบบคำนวณสิทธิ์ให้ ส่วนที่เกิน 300,000 บาท ทยอยหักปีละ 1 ใน 4 สูงสุด 50,000 บาทต่อปี (ปีภาษี 2569-2572)',
				kind: 'amount'
			}
		]
	},
	{
		testId: 'other',
		title: 'ค่าลดหย่อนอื่นๆ',
		fields: [
			{
				key: 'otherDeduction',
				testId: 'other-deduction',
				label: 'ค่าลดหย่อนอื่นๆ',
				info: 'รายการอื่นที่หักได้ตามกฎหมาย',
				kind: 'amount'
			}
		]
	}
]

const visibleSections = computed(() =>
	sections.map((section) => ({
		...section,
		fields: section.fields.filter((field) => !field.showIf || field.showIf(formData.value))
	}))
)

const fillMax = (key) => {
	formData.value[key] = props.maxValues[key]
}
</script>

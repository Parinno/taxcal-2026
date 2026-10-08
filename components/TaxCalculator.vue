<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useTaxCalculator } from '~/composables/useTaxCalculator'
import { useGoogleSheets } from '~/composables/useGoogleSheets'
import IncomeForm from '~/components/IncomeForm.vue'
import DeductionsForm from '~/components/DeductionsForm.vue'
import AdditionalDeductionsForm from '~/components/AdditionalDeductionsForm.vue'
import TaxResult from '~/components/TaxResult.vue'
import TaxSummary from '~/components/TaxSummary.vue'
import HeaderContent from '~/components/HeaderContent.vue'
import StepIndicator from '~/components/StepIndicator.vue'
import LoginNudge from '~/components/LoginNudge.vue'
import ResultEmojiVariantPicker from '~/components/ResultEmojiVariantPicker.vue'
import { useResultEmojiVariant } from '~/composables/useResultEmojiVariant'

// Current step state: 1–3 are the form steps, 4 is the result page (not shown as a step)
const currentStep = ref(1)
const isResultPage = computed(() => currentStep.value === 4)

// Result page header. U+2060 (word joiner) keeps "ของคุณ" together; Thai has no spaces to break on
const resultPageTitle = 'สรุปภาษีปี 2569 ของ\u2060คุณ'
const resultPageSubtitle = 'ประมาณการจากข้อมูลที่คุณกรอก'
// The result page has its own title and no floating summary, so its header centers on the page
const headerProps = computed(() =>
	isResultPage.value ? { title: resultPageTitle, subtitle: resultPageSubtitle, centered: true } : {}
)

// Inject currentStep from layout and update it
const layoutCurrentStep = inject('currentStep')
watch(
	currentStep,
	(newStep) => {
		if (layoutCurrentStep) {
			layoutCurrentStep.value = newStep
		}
	},
	{ immediate: true }
)

// Investment data state
const rmfInvestment = ref(0)
const thaiEsgInvestment = ref(0)

// The result page's RMF/ThaiESG inputs reset to 0 on remount, so clear them when leaving it
// to keep TaxSummary from showing stale RMF/ThaiESG on earlier steps
watch(currentStep, (step) => {
	if (step !== 4) {
		rmfInvestment.value = 0
		thaiEsgInvestment.value = 0
	}
})

// Handlers for investment data updates
const handleRmfInvestmentUpdate = (value) => {
	rmfInvestment.value = value
}

const handleThaiEsgInvestmentUpdate = (value) => {
	thaiEsgInvestment.value = value
}

// Form data for each step
const incomeData = ref({
	salary: '',
	bonus: '',
	otherIncome: '',
	withholdingTax: ''
})

const deductionsData = ref({
	personalDeduction: 60000,
	// Family facts
	hasSpouseWithoutIncome: false,
	childrenBornBefore2561Count: 0,
	childrenBornFrom2561Count: 0,
	maternityExpense: '',
	ownParentsCount: 0,
	spouseParentsCount: 0,
	disabledDependentsCount: 0,
	socialSecurity: '',
	providentFund: '',
	ltfSwitchedAmount: '',
	otherDeduction: '',
	// Step 3 additional deductions
	lifeInsurance: '',
	healthInsurance: '',
	parentHealthInsurance: '',
	spouseLifeInsurance: '',
	homeLoanInterest: '',
	solarRooftop: '',
	artwork: '',
	socialEnterprise: '',
	doubleDonation: '',
	donation: '',
	partyDonation: ''
})

// Tax calculator functions - destructure at top level for use throughout component
const { calculateTaxFromForms, getDeductionMaxes, calculateTaxPlanning } = useTaxCalculator()

// Recalculated on every input change so TaxSummary updates in real time
const calculationData = computed(() =>
	calculateTaxFromForms(incomeData.value, deductionsData.value)
)

// Per-field max for the step 2 "ใช้สิทธิ์สูงสุด" button
const deductionMaxes = getDeductionMaxes()

// Draft saved on this device while the user fills the form (NEXT-6743). Restoring it comes later
const draftStorageKey = 'tax-calculator-draft-2569'
watch(
	[incomeData, deductionsData, currentStep],
	() => {
		try {
			localStorage.setItem(
				draftStorageKey,
				JSON.stringify({
					incomeData: incomeData.value,
					deductionsData: deductionsData.value,
					currentStep: currentStep.value,
					savedAt: new Date().toISOString()
				})
			)
		} catch (error) {
			// Storage blocked (private mode, full): the form still works, only the draft is lost
			console.log(error)
		}
	},
	{ deep: true }
)

// Prototype only (NEXT-6741): which rule picks the result emoji, see useResultEmojiVariant
const { variant: resultEmojiVariant, isPrototype: isResultEmojiPrototype } = useResultEmojiVariant()

// Alert modal state
const showAlert = ref(false)

// Form validation errors
const incomeErrors = ref({})

// Validation functions
const validateIncomeForm = () => {
	const errors = {}
	const fields = ['salary', 'bonus', 'otherIncome', 'withholdingTax']

	// Check if at least one income field has value
	const hasIncome =
		incomeData.value.salary || incomeData.value.bonus || incomeData.value.otherIncome
	if (!hasIncome) {
		errors.salary = 'กรุณากรอกรายได้ทั้งหมดของคุณ อย่างน้อย 1 อย่าง'
		errors.bonus = 'กรุณากรอกรายได้ทั้งหมดของคุณ อย่างน้อย 1 อย่าง'
		errors.otherIncome = 'กรุณากรอกรายได้ทั้งหมดของคุณ อย่างน้อย 1 อย่าง'
		return errors
	}

	// Validate each field
	fields.forEach((field) => {
		const value = incomeData.value[field]
		if (value && value.toString().trim() !== '') {
			// Check if value is a valid number
			const numValue = parseFloat(value.toString().replace(/,/g, ''))
			if (isNaN(numValue)) {
				errors[field] = 'กรุณากรอกตัวเลขที่ถูกต้อง'
			} else if (numValue < 0) {
				errors[field] = 'ไม่สามารถกรอกค่าลบได้'
			} else if (numValue > 999999999) {
				errors[field] = 'จำนวนเงินสูงเกินไป (ไม่เกิน 999,999,999 บาท)'
			}
		}
	})

	return errors
}

// Current component based on step
const currentComponent = computed(() => {
	switch (currentStep.value) {
		case 1:
			return IncomeForm
		case 2:
			return DeductionsForm
		case 3:
			return AdditionalDeductionsForm
		case 4:
			return TaxResult
		default:
			return IncomeForm
	}
})

// Current form data based on step
const currentFormData = computed(() => {
	switch (currentStep.value) {
		case 1:
			return incomeData.value
		case 2:
			return deductionsData.value
		case 3:
			return deductionsData.value
		case 4:
			return calculationData.value
		default:
			return incomeData.value
	}
})

// Handle next button click
const handleNext = () => {
	if (currentStep.value === 1) {
		// Validate income form
		const errors = validateIncomeForm()
		incomeErrors.value = errors

		// If there are errors, don't proceed
		if (Object.keys(errors).length > 0) {
			return
		}

		currentStep.value = 2
	} else if (currentStep.value < 4) {
		currentStep.value++
	}

	// Scroll to top after step change
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle back button click
const handleBack = () => {
	if (currentStep.value > 1) {
		currentStep.value--
		// Scroll to top after step change
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
}

// ponytail: Sheets submit disabled for realtime summary, re-enable by calling submitToGoogleSheets() on 3→4 transition
// Prepare and submit data to Google Sheets
const submitToGoogleSheets = () => {
	try {
		// Prepare data payload combining all relevant information
		const payload = {
			// Income data
			salary: incomeData.value.salary || '',
			bonus: incomeData.value.bonus || '',
			otherIncome: incomeData.value.otherIncome || '',
			withholdingTax: incomeData.value.withholdingTax || '',
			
			// Deductions data
			personalDeduction: deductionsData.value.personalDeduction || '',
			socialSecurity: deductionsData.value.socialSecurity || '',
			providentFund: deductionsData.value.providentFund || '',
			ltfSwitchedAmount: deductionsData.value.ltfSwitchedAmount || '',
			otherDeduction: deductionsData.value.otherDeduction || '',
			
			// Calculation results
			totalIncome: calculationData.value.totalIncome || 0,
			totalExpenses: calculationData.value.totalExpenses || 0,
			totalDeductions: calculationData.value.totalDeductions || 0,
			totalDeductionsAndExpenses: calculationData.value.totalDeductionsAndExpenses || 0,
			taxableIncome: calculationData.value.taxableIncome || 0,
			taxAmount: calculationData.value.taxAmount || 0,
			netTaxPayable: calculationData.value.netTaxPayable || 0,
			
			// Investment data
			rmfInvestment: rmfInvestment.value || 0,
			thaiEsgInvestment: thaiEsgInvestment.value || 0
		}

		// Add tax planning data (calculate at submission time)
		const planning = calculateTaxPlanning(calculationData.value, rmfInvestment.value, thaiEsgInvestment.value)
		payload.totalInvestment = planning.totalInvestment || 0
		payload.taxSavings = planning.taxSavings || 0
		payload.beforeTaxAmount = planning.beforeTaxAmount || 0
		payload.afterTaxAmount = planning.afterTaxAmount || 0
		payload.finalTaxAmount = planning.finalTaxAmount || 0
		payload.finalNetTaxPayable = planning.finalNetTaxPayable || 0
		payload.taxReduction = planning.taxReduction || 0
		
		 useGoogleSheets(payload)
	
	} catch (error) {
		console.log(error)
	}
}

// Handle recalculate button click
const handleRecalculate = () => {
	currentStep.value = 1
	// Scroll to top after step change
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle step click from StepIndicator
const handleStepClick = (stepId) => {
	// Only allow navigation to completed steps or the next step
	if (stepId <= currentStep.value || stepId === currentStep.value + 1) {
		// If trying to go to step 2 from step 1, validate income form first
		if (currentStep.value === 1 && stepId === 2) {
			const errors = validateIncomeForm()
			incomeErrors.value = errors

			// If there are errors, don't proceed
			if (Object.keys(errors).length > 0) {
				return
			}
		}

		currentStep.value = stepId
		// Scroll to top after step change
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
}

// Clear errors when user starts typing
const clearIncomeErrors = () => {
	incomeErrors.value = {}
}
// Tax planning calculations for TaxSummary
const taxPlanning = computed(() =>
	calculateTaxPlanning(calculationData.value, rmfInvestment.value, thaiEsgInvestment.value)
)

// TaxSummary figures with the result page's RMF/ThaiESG counted as deductions
const summaryCalculationData = computed(() =>
	calculateTaxFromForms(incomeData.value, {
		...deductionsData.value,
		otherDeduction:
			(Number(deductionsData.value.otherDeduction) || 0) +
			(Number(rmfInvestment.value) || 0) +
			(Number(thaiEsgInvestment.value) || 0)
	})
)
</script>

<template>
	<!-- One header for every step: swapping two header instances on the way to the result page broke the DOM patch -->
	<HeaderContent v-bind="headerProps">
		<template v-if="isResultPage" #actions>
			<button
				type="button"
				class="text-[15px] font-medium text-color-primary underline underline-offset-4 min-h-[44px] px-1"
				data-test-id="tax-calculator__header-content--edit-link"
				data-fn-action="result_edit_inputs"
				@click="handleStepClick(3)"
			>
				แก้ไขข้อมูล
			</button>
		</template>
	</HeaderContent>
	<div
		class="sm:container xs:mx-auto xs:w-full xs:px-3 md:mx-auto md:max-w-7xl lg:max-w-[1272px] pb-[32px]"
		data-test-id="tax-calculator__tax-calculator--container"
	>
		<div class="flex flex-col md:flex-row md:justify-center w-full overflow-x-hidden">
			<div class="w-full md:w-[627px] px-[16px]" data-test-id="tax-calculator__tax-calculator--main-content">
				<LoginNudge v-if="!isResultPage" compact dismissible class="mt-2" />
				<StepIndicator v-if="!isResultPage" :current-step="currentStep" @step-click="handleStepClick" />
				<component :is="currentComponent" v-model="currentFormData"
					:errors="currentStep === 1 ? incomeErrors : {}"
					:max-values="currentStep === 2 ? deductionMaxes : undefined"
					:deducted="currentStep === 3 ? calculationData.deductedByField : undefined"
					@submit="handleNext" @back="handleBack"
					@recalculate="handleRecalculate" @update:rmf-investment="handleRmfInvestmentUpdate"
					@update:thai-esg-investment="handleThaiEsgInvestmentUpdate" @clear-errors="clearIncomeErrors"
					:data-test-id="`tax-calculator__tax-calculator--step-${currentStep}-form`" />
				<!-- Navigation Buttons -->
				<div class="line-separator" data-test-id="tax-calculator__tax-calculator--separator"></div>
				<div class="navigation-buttons pb-[16px] relative"
					data-test-id="tax-calculator__tax-calculator--navigation"
					data-fn-location="tax-calculator-navigation">
					<div>
						<button class="btn-back" @click="handleBack" v-if="currentStep != 1"
							:disabled="currentStep <= 1" data-test-id="tax-calculator__tax-calculator--back-button"
							data-fn-action="navigation_back">
							ย้อนกลับ
						</button>
					</div>
					<div>
						<button v-if="currentStep < 4" class="btn-next" @click="handleNext"
							data-test-id="tax-calculator__tax-calculator--next-button"
							data-fn-action="navigation_next_step">
							<!-- Step 3 leads to the result page, so the button says so (no arrow: the label needs the room on phones) -->
							<span v-if="currentStep === 3" class="whitespace-nowrap">ดูสรุปภาษีปีนี้ของฉัน</span>
							<template v-else>
								ต่อไป
								<i class="fas fa-arrow-right pl-4"
									data-test-id="tax-calculator__tax-calculator--next-icon"></i>
							</template>
						</button>
					</div>
				</div>
			</div>
			<!-- No sidebar on the result page, so its column centers on the page -->
			<div v-if="!isResultPage" class="w-full md:w-[360px] pt-8 md:pt-0 md:px-2" data-test-id="tax-calculator__tax-calculator--sidebar">
				<TaxSummary
					:calculation-data="summaryCalculationData"
					:tax-planning="taxPlanning"
					:rmf-investment="rmfInvestment"
					:thai-esg-investment="thaiEsgInvestment"
					data-test-id="tax-calculator__tax-calculator--tax-summary"
				/>
			</div>
		</div>
	</div>
	<ResultEmojiVariantPicker v-if="isResultEmojiPrototype" v-model="resultEmojiVariant" />
</template>

<style scoped>
/* Navigation Buttons */
.navigation-buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	max-width: 595px;
	padding: 0px 0px 32px 0px;
}

.btn-back {
	background: #e9eff2;
	color: var(--color-primary);
	border: none;
	border-radius: 200px;
	padding: 12px 24px;
	font-size: 15px;
	font-weight: 500;
	line-height: 24px;
	cursor: pointer;
	transition: all 0.2s ease;
	min-width: 154px;
	height: 48px;
}

.btn-back:hover {
	background: #d3dfe6;
	/* transform: translateY(-1px); */
}

.btn-next {
	background: var(--color-primary);
	color: #ffffff;
	border: none;
	border-radius: 200px;
	padding: 12px 24px;
	font-size: 15px;
	font-weight: 500;
	line-height: 24px;
	cursor: pointer !important;
	transition: all 0.2s ease;
	min-width: 154px;
	height: 48px;
}

.btn-next:hover {
	background: #001a2e;
	/* transform: translateY(-1px); */
}

.btn-next:disabled {
	background: #d3dfe6;
	color: rgba(1, 23, 43, 0.4);
	cursor: not-allowed;
	transform: none;
}

.line-separator {
	border-top: 1px solid #e1e3e6;
	margin: 2rem auto;
}

/* Responsive adjustments for buttons */
@media (max-width: 640px) {
	.navigation-buttons {
		flex-direction: row;
		justify-content: space-between;
		gap: 12px;
		padding: 0 8px;
	}

	.btn-back,
	.btn-next {
		width: 100%;
		max-width: 280px;
	}
}

@media (min-width: 641px) and (max-width: 768px) {
	.navigation-buttons {
		padding: 0 12px;
	}
}
</style>

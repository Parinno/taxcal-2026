<template>
	<!-- Result page: the user's result first and complete on its own, then the RMF/ThaiESG upsell and recommended funds -->
	<div class="space-y-8" data-test-id="tax-calculator__tax-result--container" data-fn-location="tax-result">
		<TaxResultSlip :calculation-data="modelValue" />
		<LoginNudge v-if="loginNudgeVariant === 'a'" />

		<hr class="border-gray-200" data-test-id="tax-calculator__tax-result--divider" />

		<TaxPlanningResult
			:model-value="modelValue"
			@update:rmf-investment="emit('update:rmfInvestment', $event)"
			@update:thai-esg-investment="emit('update:thaiEsgInvestment', $event)"
		/>
		<LoginNudge v-if="loginNudgeVariant === 'c'" />
		<LoginNudgeVariantPicker v-if="isLoginNudgePrototype" v-model="loginNudgeVariant" />
	</div>
</template>

<script setup>
import TaxResultSlip from '~/components/TaxResultSlip.vue'
import TaxPlanningResult from '~/components/TaxPlanningResult.vue'
import LoginNudge from '~/components/LoginNudge.vue'
import LoginNudgeVariantPicker from '~/components/LoginNudgeVariantPicker.vue'

defineProps({
	// Calculation result from the form steps (no RMF/ThaiESG planning)
	modelValue: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['update:rmfInvestment', 'update:thaiEsgInvestment'])

// Prototype only: where the login nudge sits, kept in ?login= so a link opens the same one.
// Without ?login= the page shows A and no picker
const route = useRoute()
const router = useRouter()
const isLoginNudgePrototype = computed(() => 'login' in route.query)
const loginNudgeVariant = computed({
	get: () => (['a', 'c'].includes(route.query.login) ? route.query.login : 'a'),
	set: (login) => router.replace({ query: { ...route.query, login } })
})
</script>

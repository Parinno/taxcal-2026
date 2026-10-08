<template>
	<!-- Invites a guest to log in so their inputs are remembered for next time (NEXT-6734). Hidden once logged in -->
	<!-- Matches the Figma Banner (765:67914): copy and button stacked, ✕ in its own column on the right -->
	<section
		v-if="!isLoggedIn && !dismissed"
		class="rounded-xl bg-[#F7F8F9] p-4 flex gap-4"
		:class="compact ? 'items-start' : 'items-center flex-wrap'"
		data-test-id="tax-calculator__login-nudge--container"
		data-fn-location="login-nudge"
	>
		<div
			class="min-w-0 flex-1"
			:class="compact ? 'flex flex-col gap-2' : 'flex items-center justify-between gap-4 flex-wrap'"
		>
			<div class="min-w-0">
				<p class="text-[15px] leading-6 font-bold tracking-[0.16px] text-color-primary">เข้าสู่ระบบเพื่อจดจำข้อมูล</p>
				<p class="text-[13px] leading-5 tracking-[0.32px] text-color-primary">กลับมาดูหรือแก้ไขได้ทุกเมื่อ ไม่ต้องกรอกใหม่</p>
			</div>
			<button
				type="button"
				class="secondary-button self-start"
				data-test-id="tax-calculator__login-nudge--login-button"
				data-fn-action="login_nudge_login"
				@click="login"
			>
				เข้าสู่ระบบ / สมัครสมาชิก
			</button>
		</div>
		<button
			v-if="dismissible"
			type="button"
			class="shrink-0 size-6 flex items-center justify-center text-[16px] leading-6 text-color-primary"
			aria-label="ปิด"
			data-test-id="tax-calculator__login-nudge--dismiss"
			data-fn-action="login_nudge_dismiss"
			@click="dismissed = true"
		>
			<i class="fa-sharp fa-solid fa-xmark-large"></i>
		</button>
	</section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
	// Stacked layout, for above the stepper
	compact: { type: Boolean, default: false },
	// Shows ✕; closed for this visit only, it comes back on the next one
	dismissible: { type: Boolean, default: false }
})

const dismissed = ref(false)

const { isLoggedIn } = storeToRefs(useUser())
// Leaves the page; the draft is not restored on return yet (NEXT-6743)
const { login } = useAuth()
</script>

<style scoped>
.secondary-button {
	height: 36px;
	padding: 6px 16px;
	border-radius: 200px;
	background: rgba(1, 23, 43, 0.1);
	color: var(--color-primary);
	font-size: 15px;
	font-weight: 500;
	line-height: 24px;
	letter-spacing: 0.16px;
	white-space: nowrap;
	transition: background-color 0.2s ease;
}

.secondary-button:hover {
	background: rgba(1, 23, 43, 0.15);
}
</style>

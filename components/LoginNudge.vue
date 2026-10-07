<template>
	<!-- Invites a guest to log in so their inputs are remembered for next time (NEXT-6734). Hidden once logged in -->
	<section
		v-if="!isLoggedIn && !dismissed"
		class="relative rounded-2xl bg-[#F3F6F8] py-4"
		:class="[
			compact ? 'flex flex-col justify-between gap-3' : 'flex items-center justify-between gap-4 flex-wrap',
			dismissible ? 'pl-4 pr-12' : 'px-6'
		]"
		data-test-id="tax-calculator__login-nudge--container"
		data-fn-location="login-nudge"
	>
		<div class="min-w-0">
			<p class="text-[16px] leading-6 font-medium text-color-primary">เข้าสู่ระบบเพื่อจดจำข้อมูล</p>
			<p class="text-[14px] leading-5 text-[rgba(1,23,43,0.45)] pt-1">กลับมาดูหรือแก้ไขได้ทุกเมื่อ ไม่ต้องกรอกใหม่</p>
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
		<button
			v-if="dismissible"
			type="button"
			class="absolute top-3 right-3 size-8 flex items-center justify-center text-[16px] text-[rgba(1,23,43,0.45)]"
			aria-label="ปิด"
			data-test-id="tax-calculator__login-nudge--dismiss"
			data-fn-action="login_nudge_dismiss"
			@click="dismissed = true"
		>
			✕
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

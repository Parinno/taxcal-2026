<template>
    <div class="sm:container xs:mx-auto xs:w-full xs:px-3 md:mx-auto md:max-w-7xl lg:max-w-[1272px] pb-[32px]"
        data-test-id="tax-calculator__header-content--container">
        <div class="flex justify-between w-full">
            <div class="w-[288px]">
                <!-- TODO for development : Add login and logout buttons -->
                <!-- <div class="w-[288px] flex items-start justify-start gap-2">
                    <button v-if="!isLoggedIn" class="px-3 py-2 rounded bg-[#111827] text-white text-sm"
                        @click="onLogin">
                        Login
                    </button>
                    <button v-if="!isLoggedIn" class="px-3 py-2 rounded border border-[#111827] text-[#111827] text-sm"
                        @click="onRegister">
                        Register
                    </button>
                    <button v-else class="px-3 py-2 rounded bg-[#DC2626] text-white text-sm" @click="onLogout">
                        Logout
                    </button>
                </div> -->
                <!-- End of TODO for development : Add login and logout buttons -->
            </div>
            <div class="w-[648px] px-[16px]" data-test-id="tax-calculator__header-content--main-content">
                <div class="py-[32px]" data-test-id="tax-calculator__header-content--back-section">
                    <a href="/" class="pointer-events-auto text-colors-background-navy-100 font-bold py-[4px]"
                        data-test-id="tax-calculator__header-content--back-link">
                        <i class="fas fa-chevron-left size-[20px]"></i>
                        <span class="text-[15px]" data-test-id="tax-calculator__header-content--back-text">กลับหน้าหลัก
                        </span>
                    </a>
                </div>
                <div data-test-id="tax-calculator__header-content--title-section">
                    <h1 class="text-[34px] font-bold text-color-primaryGray"
                        data-test-id="tax-calculator__header-content--main-title">
                        คำนวณภาษีและวางแผนลดหย่อนภาษี
                    </h1>
                    <p class="text-[17px] font-bold text-color-secondary"
                        data-test-id="tax-calculator__header-content--subtitle">
                        คำนวณภาษีเงินได้สำหรับบุคคลธรรมดาได้เงินคืนภาษีสูงสุด
                    </p>
                </div>
            </div>
            <div class="w-[336px]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO for development : Add login and logout buttons
// const { login, register, logout } = useAuth()
// const { isLoggedIn } = storeToRefs(useUser())

// const onLogin = () => login()
// const onRegister = () => register()
// const onLogout = () => logout()
</script>
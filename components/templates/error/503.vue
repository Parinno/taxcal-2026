<template>
    <ContainerError>
        <template #image><img :src="imageURL" alt="อยู่ระหว่างการพัฒนาระบบ" width="600" /></template>
        <template #title>อยู่ระหว่างการพัฒนาระบบ</template>
        <template #desc>Finnomena กำลังเร่งดำเนินการพัฒนาระบบเพื่อส่งมอบประสบการณ์ที่ดียิ่งขึ้นให้กับคุณ</template>
        <template #cta>
            <Button color="primary" size="sm" class="error-button__action" :href="webBaseURL">
                กลับสู่หน้าหลัก
            </Button>   
        </template>
    </ContainerError>
</template>
<script setup lang="ts">
import ContainerError from '@/components/templates/container/Error.vue'
import Button from '@/components/Button.vue'
const config = useRuntimeConfig()
const imageURL = `${config.public.url.scontent}/page-assets/image/error_503.png`
const webBaseURL = config.public.url.base
useHead({
    title: 'อยู่ระหว่างการพัฒนาระบบ - Finnomena'
})
</script>

<style scoped>
.error-button__action {
    @apply cursor-pointer rounded-lg border-0 bg-button-primary px-3 py-2 text-sm font-bold text-white;
}
</style>

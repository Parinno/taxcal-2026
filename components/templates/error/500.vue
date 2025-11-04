<template>
    <ContainerError>
        <template #image><img :src="imageURL" alt="ระบบขัดข้อง" width="600" /></template>
        <template #title>ระบบขัดข้อง</template>
        <template #desc>กรุณารีเฟรชเพื่อลองใหม่อีกครั้ง</template>
        <template #cta>
            <Button color="primary" size="sm" class="error-button__action" :href="route.fullPath">
                <i class="fas fa-sync"></i> รีเฟรช
            </Button>
        </template>
    </ContainerError>
</template>
<script setup lang="ts">
import ContainerError from '@/components/templates/container/Error.vue'
import Button from '@/components/Button.vue'
const route = useRoute()
const config = useRuntimeConfig()
const imageURL = `${config.public.url.scontent}/page-assets/image/error_500.png`
useHead({
    title: 'ระบบขัดข้อง - Finnomena'
})
</script>

<style scoped>
.error-button__action {
    @apply cursor-pointer rounded-lg border-0 bg-button-primary px-3 py-2 text-sm font-bold text-white;
}
</style>

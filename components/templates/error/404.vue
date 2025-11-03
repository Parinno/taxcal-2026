<template>
    <ContainerError>
        <template #image><img :src="imageURL" alt="ไม่พบหน้าที่คุณค้นหา" width="600" /></template>
        <template #title>ไม่พบหน้าที่คุณค้นหา</template>
        <template #desc>กรุณาลองค้นหาใหม่อีกครั้ง หรือกลับไปที่หน้าแรก</template>
        <template #cta>
            <Button color="primary" size="sm" class="error-button__action" :href="webBaseURL"> กลับไปหน้าแรก </Button>
        </template>
    </ContainerError>
</template>

<script setup lang="ts">
import ContainerError from '@/components/templates/container/Error.vue'
import Button from '@/components/Button.vue'
const config = useRuntimeConfig()
const imageURL = `${config.public.url.scontent}/page-assets/image/error_404.png`
const webBaseURL = config.public.url.base

useHead({
    title: 'Page not found - Finnomena'
})
</script>

<style scoped>
.error-button__action {
    @apply cursor-pointer rounded-lg border-0 bg-button-primary px-3 py-2 text-sm font-bold text-text-on-color;
}
</style>

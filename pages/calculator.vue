

<script setup>
import TaxCalculator from '~/components/TaxCalculator.vue'
const config = useRuntimeConfig()

definePageMeta({
  alias: ['/%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5'],
  layout: 'tax-calculator'
})

// SEO Meta Tags
useHead({
  title: 'คำนวณภาษี วางแผนลดหย่อนภาษี | Finnomena',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.url.base}/tax/คำนวณภาษี`
    }
  ]
})

useSeoMeta({
  description: 'เครื่องมือช่วยคำนวณภาษี พร้อมวางแผนลดหย่อนภาษีเพิ่มเติมได้ง่ายๆ ด้วยกองทุน RMF และ ThaiESG แนะนำจาก Finnomena',
  ogTitle: 'คำนวณภาษี วางแผนลดหย่อนภาษี | Finnomena',
  ogDescription: 'เครื่องมือช่วยคำนวณภาษี พร้อมวางแผนลดหย่อนภาษีเพิ่มเติมได้ง่ายๆ ด้วยกองทุน RMF และ ThaiESG แนะนำจาก Finnomena',
  ogImage: `${config.public.url.scontent}/tax/tax-cal-og.png`,
  ogUrl: `${config.public.url.base}/tax/คำนวณภาษี`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'คำนวณภาษี วางแผนลดหย่อนภาษี | Finnomena',
  twitterDescription: 'เครื่องมือช่วยคำนวณภาษี พร้อมวางแผนลดหย่อนภาษีเพิ่มเติมได้ง่ายๆ ด้วยกองทุน RMF และ ThaiESG แนะนำจาก Finnomena',
  twitterImage: `${config.public.url.scontent}/tax/tax-cal-og.png`
})
</script>

<template>
  <TaxCalculator />
</template>

<style scoped>
/* Custom styles if needed */
</style>
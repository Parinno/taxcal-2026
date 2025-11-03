

<script setup>
import TaxCalculator from '~/components/TaxCalculator.vue'
const config = useRuntimeConfig()

definePageMeta({
  alias: ['/%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5'],
  layout: 'tax-calculator'
})

// SEO Meta Tags
useHead({
  title: 'คำนวณภาษีเงินได้บุคคลธรรมดา | FINNOMENA',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.url.finnomenaWebsiteUrl}/tax/คำนวณภาษี`
    }
  ]
})

useSeoMeta({
  description: 'คำนวณภาษีเงินได้บุคคลธรรมดาออนไลน์ฟรี ช่วยวางแผนภาษีและดูสิทธิ์ลดหย่อนภาษีได้ง่าย ๆ พร้อมคำแนะนำจาก FINNOMENA.',
  ogTitle: 'คำนวณภาษีเงินได้บุคคลธรรมดา | FINNOMENA',
  ogDescription: 'คำนวณภาษีเงินได้ออนไลน์ฟรี พร้อมแนะนำสิทธิ์ลดหย่อนและวางแผนภาษีอย่างชาญฉลาดกับ FINNOMENA.',
  ogImage: `${config.public.url.contentUrl}`, // เว้นไว้ก่อนรอรูปจากพี่เบส
  ogUrl: `${config.public.url.finnomenaWebsiteUrl}/tax/คำนวณภาษี`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'คำนวณภาษีเงินได้บุคคลธรรมดา | FINNOMENA',
  twitterDescription: 'คำนวณภาษีออนไลน์ฟรี พร้อมสิทธิ์ลดหย่อนและแนะนำการวางแผนภาษีรายปี',
  twitterImage: `${config.public.url.contentUrl}` // เว้นไว้ก่อนรอรูปจากพี่เบส
})
</script>

<template>
  <TaxCalculator />
</template>

<style scoped>
/* Custom styles if needed */
</style>
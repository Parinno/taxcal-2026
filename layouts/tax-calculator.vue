<template>
  <div>
    <Header />
    <section class="sm:container xs:mx-auto xs:w-full xs:px-3 md:mx-auto md:max-w-7xl lg:max-w-[1440px]">
      <slot />
    </section>
    <Disclaimer />
    <Footer />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Header from '~/components/header/Header.vue'
import Footer from '~/components/footer/Footer.vue'
import Disclaimer from '~/components/Disclaimer.vue'

// Current step state - provide to child components
const currentStep = ref(1)
provide('currentStep', currentStep)
</script>

<style scoped>
/* Layout-specific styles */

/* Header Title */
.header-title {
  width: 616px;
  height: 48px;
  font-size: 34px;
  line-height: 48px;
  color: rgba(1, 23, 43, 0.87);
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0 auto;
  text-align: center;
}

/* Header Subtitle */
.header-subtitle {
  width: 616px;
  height: 24px;
  font-size: 17px;
  line-height: 24px;
  letter-spacing: 0.16px;
  color: rgba(1, 23, 43, 0.65);
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0 auto;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .header-title {
    width: 100%;
    max-width: 616px;
    font-size: 28px;
    line-height: 40px;
    height: auto;
  }

  .header-subtitle {
    width: 100%;
    max-width: 616px;
    font-size: 15px;
    line-height: 22px;
    height: auto;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .header-title {
    width: 100%;
    max-width: 616px;
  }

  .header-subtitle {
    width: 100%;
    max-width: 616px;
  }
}
</style>

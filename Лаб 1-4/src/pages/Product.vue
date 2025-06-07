<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import Slider from '@/components/product/Slider.vue' 
import ProductInformation from '@/components/product/ProductInformation.vue'
import FeaturedItems from '@/components/FeaturedItems.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted, ref } from 'vue'
import { getProductData } from '@/services/productService'

const products = ref([])

onMounted(async () => {
  const { data } = await getProductData()
  products.value = data.related
})
</script>

<template>
    <main>
        <div class="home">
            <Header />
            <Navigation
              :show-left="true"
              :show-right="true"
              left-text="NEW ARRIVALS"
              :right-items="['HOME', 'MEN', 'NEW ARRIVALS']"
              active-item="NEW ARRIVALS"
            />
            <Slider />
            <ProductInformation />
            <FeaturedItems
              :products="products"
              :show-header="false"
              :show-footer="false"
            />
            <SubscribeBanner />
            <FooterBlock />
        </div>
    </main>
</template>
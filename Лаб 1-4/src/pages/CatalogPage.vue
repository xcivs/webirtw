<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import FiltersPanel from '@/components/catalog/FiltersPanel.vue'
import FeaturedItems from '@/components/FeaturedItems.vue'
import Pagination from '@/components/Pagination.vue'
import InfoBanner from '@/components/InfoBanner.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted, ref } from 'vue'
import { getCatalogData } from '@/services/catalogService'

const products = ref([])

onMounted(async () => {
  const { data } = await getCatalogData()
  products.value = data.products
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
            <FiltersPanel />
              <FeaturedItems
                :products="products"
                :show-header="false"
                :show-footer="false"
              />
            <Pagination />
            <InfoBanner />
            <SubscribeBanner />
            <FooterBlock />
        </div>
    </main>
</template>
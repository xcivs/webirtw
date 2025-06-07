<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import CartPage from '../components/Cart/CartPage.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted, ref } from 'vue'
import { getCartData } from '@/services/cartService'

const cartItems = ref([])

onMounted(async () => {
  const { data } = await getCartData()
  cartItems.value = data.items
})
</script>


<template>
    <main>
        <div class="home">
            <Header />
            <Navigation
              :show-left="true"
              :show-right="false"
              left-text="SHOPPING CART"
            />
            <CartPage />
            <SubscribeBanner />
            <FooterBlock />
        </div>
    </main>
</template>
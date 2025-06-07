<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import Registration from '../components/Registration/Registration.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted, ref } from 'vue'
import { getRegistrationData } from '@/services/registrationService'

const registrationData = ref(null)

onMounted(async () => {
  const { data } = await getRegistrationData()
  registrationData.value = data
})
</script>

<template>
    <main>
        <div class="home">
            <Header />
            <Navigation
              :show-left="true"
              :show-right="false"
              left-text="REGISTRATION"
            />
            <Registration />
            <SubscribeBanner />
            <FooterBlock />
        </div>
    </main>
</template>
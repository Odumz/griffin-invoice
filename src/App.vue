<script setup lang="ts">
import Navigation from './components/Navigation.vue';
import InvoiceModal from './components/InvoiceModal.vue'
import Modal from './components/Modal.vue';
import * as actionTypes from './store/constants/actions';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';

const store: any = useStore()

const invoiceModal = computed(() => {
  return store.getters.getInvoiceModal.value
})

onMounted(async () => {
  await store.dispatch(actionTypes.GetInvoices)
})

const getInvoicesLoaded:any = computed(() => {
  return store.getters.getInvoicesLoaded.value
})

const modalActive: any = computed(() => {
  return store.getters.getModalActive.value
})


// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
<div v-if="getInvoicesLoaded">
  <div class="app flex">
    <Navigation />
    <div class="app-content flex flex-col">
      <Modal v-if="modalActive" />
      <transition name="invoice">
        <InvoiceModal v-if="invoiceModal" />      
      </transition>
      <router-view />
    </div>
  </div>
</div>
</template>

<style lang="scss">
* {
  @apply m-0 p-0 box-border;
  font-family: "Public Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  @apply bg-dark-blue flex-col min-h-screen dl:flex-row;
  .app-content {
    @apply py-0 px-5 flex-[1] relative;  
  }
}

// animated invoice
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}
.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  @apply cursor-pointer py-4 px-6 rounded-3xl text-xs mr-2 text-white;
}

.container {
  @apply w-full py-10 px-2 max-w-4xl mx-auto dl:pt-20;
}

.nav-link {
  text-decoration: none;
  color: initial;
}

.status-button {
  @apply before:content-[''] before:w-2 before:h-2 before:rounded-full before:mr-2 text-xs mr-8 items-center py-2 px-8 rounded-lg;
}

.paid {
  @apply before:bg-green text-green bg-paid bg-opacity-10;
}

.pending {
  @apply before:bg-orange text-orange bg-pending bg-opacity-10;
}

.draft {
  @apply before:bg-draft text-draft bg-draft bg-opacity-10;
}
</style>

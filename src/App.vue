<script setup lang="ts">
import Navigation from './components/Navigation.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
<div>
  <div class="app flex">
    <Navigation />
    <div class="app-content flex flex-col">
      <router-view />
    </div>
  </div>
</div>
</template>

<style>
* {
  @apply m-0 p-0 box-border;
  font-family: "Public Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  @apply bg-dark-blue flex-col min-h-screen dl:flex-row;
}

.app-content {
  @apply py-0 px-5 flex-1 relative;  
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

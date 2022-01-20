<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import Invoice from '../components/Invoice.vue'
import * as mutationTypes from '../store/constants/mutations';
import * as actionTypes from '../store/constants/actions';

const store = useStore();

const name = "Home"

onMounted(async () => {
  await store.dispatch(actionTypes.GetInvoices)
  await store.getters.getInvoiceData
})

const invoiceData = computed(() => {
    return JSON.parse(JSON.stringify(store.getters.getInvoiceData.value))
})

const invoiceModal = computed(() => {
    return store.getters.getInvoiceModal
})

const filterMenu = ref(false)

const toggleFilterMenu = () => {
    filterMenu.value = !filterMenu.value
}

const newInvoice = () => {
    store.commit(mutationTypes.ToggleInvoice)
}
</script>

<template>
    <div class="home container">
        <!-- Header -->
        <div class="header flex">
            <div class="flex left flex-col">
                <h1>Invoices</h1>
                <!-- <span>There are {{ invoiceData.length }} total invoices here</span> -->
            </div>
            <div class="right flex">
                <div @click="toggleFilterMenu" class="filter flex">
                    <span>Filter by status</span>
                    <img src="../assets/icon-arrow-down.svg" alt="arrow down icon">
                    <ul v-show="filterMenu" class="filter-menu">
                        <li>Draft</li>
                        <li>Pending</li>
                        <li>Paid</li>
                        <li>Clear Filter</li>
                    </ul>
                </div>
                <div @click.prevent="newInvoice" class="button flex">
                    <div class="inner-button flex">
                        <img src="../assets/icon-plus.svg" alt="plus icon">
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
        <!-- Invoice List -->
        <div v-if="invoiceData.length > 0">
            <Invoice v-for="(invoice, index) in invoiceData" :invoice="invoice" :key="index" />
        </div>
        <div v-else class="empty flex flex-col">
            <img src="../assets/illustration-empty.svg" alt="Empty illustration">
            <h3>There is nothing here</h3>
            <p>Create a new invoice by clicking the New Invoice button and get started</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    @apply text-white;

    .header {
        @apply mb-16;

        .left,
        .right {
            @apply flex-[1];
        }

        .right {
            @apply justify-end items-center;

            .button,
            .filter {
                @apply items-center;

                span {
                    @apply text-xs;
                }
            }

            .filter {
                @apply relative mr-10 cursor-pointer;

                img {
                    @apply ml-3 w-2 h-1;
                }

                .filter-menu {
                    @apply w-32 absolute top-6 list-none bg-deep-blue shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)];

                    li {
                        @apply cursor-pointer text-xs py-[10px] px-5 hover:text-deep-blue hover:bg-white
                    }
                }
            }

            .button {
                @apply py-2 px-3 bg-purple rounded-[40px];

                .inner-button {
                    @apply mr-2 rounded-full p-2 items-center justify-center bg-white;

                    img {
                        @apply w-[10] h-[10];
                    }
                }
            }
        }
    }

    .empty {
        @apply mt-[160px] items-center;

        img {
            @apply w-[214px] h-[200px];
        }

        h3 {
            @apply text-xl mt-10;
        }

        p {
            @apply text-center max-w-[224px] text-xs font-light mt-4;
        }
    }
}
</style>
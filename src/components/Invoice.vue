<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props:any = defineProps({
    invoice: Object,
})
props.invoice = ref({})
</script>

<template>
    <router-link class="invoice flex" :to="{ name: 'Invoice', params: { invoiceId: props.invoice.invoiceId} }">
    <div class="left flex">
        <span class="tracking-number">#{{ props.invoice.invoiceId }}</span>
        <span class="due-date">{{ props.invoice.paymentDueDate }}</span>
        <span class="person">{{ props.invoice.clientName }}</span>
    </div>
    <div class="right flex">
        <span class="price">${{ props.invoice.invoiceTotal }}</span>
        <div class="status-button flex" :class="{ paid: props.invoice.invoicePaid, draft: props.invoice.invoiceDraft, pending: props.invoice.invoicePending }">
            <span v-if="props.invoice.invoicePaid">Paid</span>
            <span v-if="props.invoice.invoiceDraft">Draft</span>
            <span v-if="props.invoice.invoicePending">Pending</span>
        </div>
        <div class="icon">
            <img src="../assets/icon-arrow-right.svg" alt="arrow right icon">
        </div>
    </div>
    </router-link>
</template>

<style lang="scss" scoped>
.invoice {
    @apply no-underline cursor-pointer gap-4 mb-4 text-white rounded-[20px] py-7 px-8 bg-deep-blue items-center;

    span {
        @apply text-[13px];
    }

    .left {
        @apply items-center basis-3/5 gap-4;

        span {
            @apply flex-[1];
        }

        .tracking-number {
            @apply uppercase;
        }
    }

    .right {
        @apply gap-4 basis-2/5 items-center;

        .price {
            @apply flex-[1] text-base font-semibold;
        }
    }
}
</style>
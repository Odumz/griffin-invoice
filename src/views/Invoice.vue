<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import * as mutationTypes from '../store/constants/mutations';

const store:any = useStore();
const route:any = useRoute();

onMounted(() => {
    // getCurrentInvoice
    store.commit(mutationTypes.SetCurrentInvoice, route.params.invoiceId)
    // console.log('current invoice array', store.getters.getCurrentInvoiceArray.value)
    
})

const toggleEditInvoice = () => {
    store.commit(mutationTypes.ToggleEditInvoice)
    store.commit(mutationTypes.ToggleInvoice)
}

const deleteInvoice = async (id:any) => {
    await store.commit(mutationTypes.DeleteInvoice, id)
}

const updateStatusToPaid = async (id:any) => {
    await store.commit(mutationTypes.UpdateStatusToPaid, id)
}

const updateStatusToPending = async (id:any) => {
    await store.commit(mutationTypes.UpdateStatusToPending, id)
}

let currentInvoice:any = computed( () => {
    return JSON.parse(JSON.stringify(store.getters.getCurrentInvoiceArray.value))
})

    
</script>

<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
            <img src="../assets/icon-arrow-left.svg" alt="arrow left icon"> Go Back
        </router-link>
        <!-- Header -->
        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div class="status-button flex" :class="{paid: currentInvoice[0].invoicePaid, draft: currentInvoice[0].invoiceDraft, pending: currentInvoice[0].invoicePending}">
                    <span v-if="currentInvoice[0].invoicePaid">Paid</span>
                    <span v-if="currentInvoice[0].invoiceDraft">Draft</span>
                    <span v-if="currentInvoice[0].invoicePending">Pending</span>
                </div>
            </div>
            <div class="right flex">
                <button @click="toggleEditInvoice" class="button bg-dark-purple">Edit</button>
                <button @click="deleteInvoice(currentInvoice[0].docId)" class="bg-red button">Delete</button>
                <button v-if="currentInvoice[0].invoicePending" @click="updateStatusToPaid(currentInvoice[0].docId)" class="button bg-green">Mark as Paid</button>
                <button v-if="currentInvoice[0].invoiceDraft ||  currentInvoice[0].invoicePaid" @click="updateStatusToPending(currentInvoice[0].docId)" class="button bg-orange">Mark as Pending</button>
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details flex flex-col">
            <div class="top flex">
                <div class="left flex flex-col">
                    <p><span>#</span>{{ currentInvoice[0].invoiceId }}</p>
                    <p>{{ currentInvoice[0].productDescription }}</p>
                </div>
                <div class="right flex flex-col">
                    <p>{{ currentInvoice[0].billerStreetAddress }}</p>
                    <p>{{ currentInvoice[0].billerCity }}</p>
                    <p>{{ currentInvoice[0].billerZipCode }}</p>
                    <p>{{ currentInvoice[0].billerCountry }}</p>
                </div>
            </div>
            <div class="middle flex">
                <div class="payment flex flex-col">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice[0].invoiceDate }}</p>
                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice[0].paymentDueDate }}</p>
                </div>
                <div class="bill flex flex-col">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice[0].clientName }}</p>
                    <p>{{ currentInvoice[0].clientStreetAddress }}</p>
                    <p>{{ currentInvoice[0].clientCity }}</p>
                    <p>{{ currentInvoice[0].clientZipCode }}</p>
                    <p>{{ currentInvoice[0].clientCountry }}</p>
                </div>
                <div class="send-to flex flex-col">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice[0].clientEmail }}</p>
                </div>
            </div>
            <div class="bottom flex flex-col">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>Qty</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div v-for="(item, index) in currentInvoice[0].invoiceItemList.invoices" :key="index" class="item flex">
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>
                <div class="total flex">
                    <p>Amount Due</p>
                    <p>{{ currentInvoice[0].invoiceTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.invoice-view {
    .nav-link {
        @apply mb-8 items-center text-white text-xs;

        img{
            @apply mr-4 w-[7px] h-[10px];
        }
    }

    .header,
    .invoice-details {
        @apply bg-deep-blue rounded-[20px];
    }

    .header {
        @apply items-center py-6 px-8 text-xs;

        .left {
            @apply items-center;

            span {
                @apply text-draft mr-4;
            }
        }

        .right {
            @apply flex-[1] justify-end;

            button {
                @apply text-white;
            }
        }
    }

    .invoice-details {
        @apply p-12 mt-6;

        .top {
            div {
                @apply text-draft flex-[1];
            }

            .left {
                @apply text-xs;

                p:first-child {
                    @apply text-2xl uppercase text-white mb-2;
                }
                
                p:nth-child(2) {
                    @apply text-base;
                }

                span {
                    @apply text-[#888eb0];
                }
            }

            .right {
                @apply text-xs items-end;
            }
        }

        .middle {
            @apply mt-[50px] text-draft gap-4;

            h4 {
                @apply text-xs font-normal mb-3;
            }

            p {
                @apply text-base;
            }

            .bill,
            .payment {
                @apply flex-[1];
            }

            .payment {
                h4:nth-child(3) {
                    @apply mt-8;
                }

                p {
                    @apply font-semibold;
                }
            }

            .bill {
                p:nth-child(2) {
                    @apply text-base;
                }

                p:nth-child(3) {
                    @apply mt-auto;
                }

                p {
                    @apply text-xs;
                }
            }

            .send-to {
                @apply flex-[2];
            }
        }

        .bottom {
            @apply mt-[50px];

            .billing-items {
                @apply p-8 rounded-[20px_20px_0_0] bg-purple;

                .heading {
                    @apply text-draft text-xs mb-8;

                    p:first-child {
                        @apply flex-[3] text-left;
                    }

                    p {
                        @apply flex-[1] text-right;
                    }
                }

                .item {
                    @apply mb-8 text-[13px] text-white;

                    &:last-child {
                        @apply mb-0;
                    }

                    p:first-child {
                        @apply flex-[3] text-left;
                    }

                    p {
                        @apply flex-[1] text-right;
                    }
                }
            }

            .total {
                @apply text-white p-8 bg-[rgba(12,14,22,0.7)] items-center rounded-[0_0_20px_20px];

                p {
                    @apply flex-[1];
                }

                p:nth-child(2) {
                    @apply text-[28px] text-right;
                }
            }
        }
    }
}
</style>
<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import * as mutationTypes from '../store/constants/mutations';
import { uid } from 'uid';
import db from '../firebase/firebaseInit';
import { collection, addDoc } from 'firebase/firestore';
import * as actionTypes from '../store/constants/actions';
import loadingIcon from './loading.vue';

const store = useStore();

const name = "InvoiceModal"

let billerStreetAddress:any = ref('')
let billerCity:any = ref(''), billerZipCode:any = ref(''), billerCountry:any = ref(''), clientEmail:any = ref(''), clientName:any = ref(''), clientStreetAddress:any = ref(''), clientCity:any = ref(''), clientZipCode:any = ref(''), clientCountry:any = ref(''), invoiceDateUnix:any = ref(0), invoiceDate:any = ref(''), paymentDueDateUnix:any = ref(0), productDescription:any = ref(''), welcome:any = ref('');

let paymentTerms:any = ref('')

let invoicePending:any, invoiceDraft:any = ref(false)

let dateOptions:any = {
    year: "numeric",
    month: "short",
    day: "numeric"
};

invoiceDateUnix = Date.now()
invoiceDate = new Date(invoiceDateUnix).toLocaleDateString('en-us', dateOptions)

let paymentDueDate:any = ref('')

let invoiceItemList:any = reactive({
    invoices: []
});

let invoiceTotal:any = ref(0);

watch(paymentTerms, (oldTerms: any, newTerms: any) => {
    const futureDate = new Date();
    paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(paymentTerms.value));
    nextTick()
        .then(function () {
            // DOM updated
            paymentDueDate.value = new Date(paymentDueDateUnix).toLocaleDateString('en-us', dateOptions);
        })    
})

const checkClick:any = () => {}

let loading:any = ref(false)

const deleteInvoiceItem:any = async (id:string) => {
    let newInvoiceItemList: any = JSON.parse(JSON.stringify(invoiceItemList.invoices));
    invoiceItemList.invoices = newInvoiceItemList.filter((item:any) => item.id != id)
}

const calcInvoiceTotal:any = () => {
    invoiceTotal = 0;
    invoiceItemList.invoices.forEach((item:any) => {
        invoiceTotal += item.total;
    })
}

const addNewInvoiceItem:any = async () => {
    await invoiceItemList.invoices.push({
        id: uid(),
        itemName: '',
        qty: '',
        price: 0,
        total: 0,
    })
}

const saveDraft:any = () => {
    invoiceDraft = true
}

const publishInvoice:any = () => {
    invoicePending = true
}

const uploadInvoice:any = async () => {

    console.log('loading', loading.value);
    if (invoiceItemList.invoices <= 0) {
        alert('Please ensure you filled out work items')
        return;
    }

    loading.value = true;
    console.log('loading', loading.value);
    
    calcInvoiceTotal();

    const invoiceDataTemplate:any = reactive({
        invoiceId: uid(8),
        billerStreetAddress,
        billerCity,
        billerZipCode,
        billerCountry,
        clientName,
        clientEmail,
        clientStreetAddress,
        clientCity,
        clientZipCode,
        clientCountry,
        invoiceDate,
        invoiceDateUnix,
        paymentTerms,
        paymentDueDate,
        paymentDueDateUnix,
        productDescription,
        invoiceItemList,
        invoiceTotal,
        invoicePending,
        invoiceDraft,
        invoicePaid: null,
    })

    // const invoiceData:any = JSON.parse(JSON.stringify(invoiceDataTemplate));

    // console.log('invoice data', JSON.parse(JSON.stringify(invoiceDataTemplate)))

    const database:any = await addDoc(collection(db, 'invoices'), JSON.parse(JSON.stringify(invoiceDataTemplate)));

    loading.value = false;
    console.log('loading', loading);

    store.commit(mutationTypes.ToggleInvoice)
    // store.dispatch(actionTypes.GetInvoices);
}

const submitForm:any = () => {
    // if (editInvoice)
    uploadInvoice()
}

const invoiceData = computed(() => {
    return store.getters.getInvoiceData
})

const invoiceModal = computed(() => {
    return store.getters.getInvoiceModal
})

const closeInvoice = () => {
    store.commit(mutationTypes.ToggleInvoice)
}

</script>

<template>
    <div>
        <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-col">
            <form @submit.prevent="submitForm" class="invoice-content">
                <loading-icon v-show="loading" />
                <h1>New Invoice</h1>
                <!-- Bill From -->
                <div class="bill-from flex flex-col">
                    <h4>Bill From</h4>
                    <div class="input flex flex-col">
                        <label for="billerStreetAddress">Street Address</label>
                        <input type="text" id="billerStreetAddress" required v-model="billerStreetAddress">
                    </div>
                    <div class="location-details flex">
                        <div class="input flex flex-col">
                            <label for="billerCity">City</label>
                            <input type="text" id="billerCity" required v-model="billerCity">
                        </div>
                        <div class="input flex flex-col">
                            <label for="billerZipCode">Zip Code</label>
                            <input type="text" id="billerZipCode" required v-model="billerZipCode">
                        </div>
                        <div class="input flex flex-col">
                            <label for="billerCountry">Country</label>
                            <input type="text" id="billerCountry" required v-model="billerCountry">
                        </div>
                    </div>
                </div>

                <!-- Bill To -->
                <div class="bill-to flex flex-col">
                    <h4>Bill To</h4>
                    <div class="input flex flex-col">
                        <label for="clientName">Client's Name</label>
                        <input type="text" id="clientName" required v-model="clientName">
                    </div>
                    <div class="input flex flex-col">
                        <label for="clientEmail">Client's Email</label>
                        <input type="email" id="clientEmail" required v-model="clientEmail">
                    </div>
                    <div class="input flex flex-col">
                        <label for="clientStreetAddress">Street Address</label>
                        <input type="text" id="clientStreetAddress" required v-model="clientStreetAddress">
                    </div>
                    <div class="location-details flex">
                        <div class="input flex flex-col">
                            <label for="clientCity">City</label>
                            <input type="text" id="clientCity" required v-model="clientCity">
                        </div>
                        <div class="input flex flex-col">
                            <label for="clientZipCode">Zip Code</label>
                            <input type="text" id="clientZipCode" required v-model="clientZipCode">
                        </div>
                        <div class="input flex flex-col">
                            <label for="clientCountry">Country</label>
                            <input type="text" id="clientCountry" required v-model="clientCountry">
                        </div>
                    </div>
                </div>

                <!-- Invoice Work Details -->
                <div class="invoice-work flex flex-col">
                    <div class="payment flex">
                    <div class="input flex flex-col">
                        <label for="invoiceDate">Invoice Date</label>
                        <input type="text" id="invoiceDate" v-model="invoiceDate" disabled>
                    </div>
                    <div class="input flex flex-col">
                        <label for="paymentDueDate">Payment Due</label>
                        <input type="text" id="paymentDueDate" v-model="paymentDueDate" disabled>
                    </div>
                    </div>
                    <div class="input flex flex-col">
                        <label for="paymentTerms">Payment Terms</label>
                        <select id="paymentTerms" required v-model="paymentTerms">
                            <option value="30">Net 30 Days</option>
                            <option value="60">Net 60 Days</option>
                        </select>
                    </div>
                    <div class="input flex flex-col">
                        <label for="productDescription">Product Description</label>
                        <input type="text" id="productDescription" required v-model="productDescription">
                    </div>
                    <div class="work-items">
                        <h3>Item List</h3>
                        <table class="item-list">
                            <tr class="table-heading flex">
                                <th class="item-name">Item Name</th>
                                <th class="qty">Qty</th>
                                <th class="price">Price</th>
                                <th class="total">Total</th>
                            </tr>
                            <tr class="table-items flex" v-for="(item, index) in invoiceItemList.invoices" :key="index">
                                <td class="item-name"><input type="text" v-model="item.itemName"></td>
                                <td class="qty"><input type="text" v-model="item.qty"></td>
                                <td class="price"><input type="text" v-model="item.price"></td>
                                <td class="total flex">${{ (item.total = item.qty * item.price) }}
                                    <img @click="deleteInvoiceItem(item.id)" src="../assets/icon-delete.svg" alt="delete icon">
                                </td>                                
                            </tr>
                        </table>
                        <div @click.prevent="addNewInvoiceItem" class="flex button">
                            <img src="../assets/icon-plus.svg" alt="plus icon">
                            Add New Item
                        </div>
                    </div>
                </div>

                <!-- Save & Exit -->
                <div class="save flex">
                    <div class="left">
                        <button @click="closeInvoice" class="button bg-red">Cancel</button>
                    </div>
                    <div class="right flex">
                        <button @click="saveDraft" class="button bg-dark-purple">Save Draft</button>
                        <button @click="publishInvoice" class="button bg-purple">Create Invoice</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.invoice-wrap {
    @apply fixed top-0 left-0 w-full h-screen overflow-scroll no-scrollbar dl:left-[90px];

    .invoice-content {
        @apply relative p-14 max-w-[700px] w-full bg-dark-blue text-white shadow-[10px_4px_6px_-1px_rgba(0,0,0,0.2),_0_2px_4px_-1px_rgba(0,0,0,0.06)];

        h1 {
            @apply mb-12 text-white;
        }

        h3 {
            @apply mb-4 text-[18px] text-[#777f98];
        }

        h4 {
            @apply text-purple text-xs mb-6;
        }

        // Bill To / Bill From
    .bill-to,
    .bill-from {
        @apply mb-12;
      .location-details {
          @apply gap-4;
        div {
            @apply flex-1;
        }
      }
    }
    // Invoice Work
    .invoice-work {
      .payment {
          @apply gap-6;
        div {
            @apply flex-1;
        }
      }
      .work-items {
        .item-list {
            @apply w-full;
          // Item Table Styling
          .table-heading,
          .table-items {
              @apply gap-4 text-xs;
            .item-name {
                @apply basis-1/2;
            }
            .qty {
                @apply basis-[10%];
            }
            .price {
                @apply basis-[20%];
            }
            .total {
                @apply basis-[20%] self-center;
            }
          }
          .table-heading {
              @apply mb-4;
            th {
                @apply text-left;
            }
          }
          .table-items {
              @apply relative mb-6;
            img {
                @apply absolute top-[15px] right-0 w-3 h-4;
            }
          }
        }
        .button {
            @apply text-white bg-dark-purple items-center justify-center w-full;
          img {
              @apply mr-1;
          }
        }
      }
    }
    .save {
        @apply mt-[60px];
      div {
          @apply flex-1;
      }
      .right {
          @apply justify-end;
      }
    }
    }

    .input {
        @apply mb-6;
    }

    label {
        @apply text-xs mb-[6px];
    }

    input,
    select {
        @apply w-full bg-deep-blue text-white rounded py-3 px-1 focus:outline-none border-0;
    }
}
</style>
import { createStore } from 'vuex'
import * as actionTypes from './constants/actions'
import * as mutationTypes from './constants/mutations'
import { ToggleInvoice, ToggleModal, SetInvoiceData, InvoicesLoaded, SetCurrentInvoice } from './constants/mutations';
import { UpdateStatusToPaid } from './constants/actions';

const store = createStore({
    state: {
        invoiceModal:<boolean> false,
        invoiceData:<any> [],
        modalActive:<boolean> false,
        invoicesLoaded:<boolean> false,
        currentInvoiceArray: null,
        editInvoice:<boolean> false,
    },
    mutations: {
        [mutationTypes.ToggleInvoice] (state) {
            state.invoiceModal = !state.invoiceModal;
        },
        [mutationTypes.ToggleModal] (state) {
            state.modalActive = !state.invoiceModal;
        },
        [mutationTypes.SetInvoiceData] (state, payload: any) {
            state.invoiceData.push(payload);
        },
        [mutationTypes.InvoicesLoaded] (state) {
            state.invoicesLoaded = true;
        },
        [mutationTypes.SetCurrentInvoice] (state, payload: any) {
            state.currentInvoiceArray = state.invoiceData.filter((invoice: any) => invoice.invoiceId === payload)
        },
        [mutationTypes.ToggleEditInvoice] (state) {
            state.editInvoice = !state.editInvoice;
        },
        [mutationTypes.DeleteInvoice] (state, payload: any) {
            state.invoiceData = state.invoiceData.filter((invoice: any) => invoice.docId !== payload);
        },
        [mutationTypes.UpdateStatusToPaid] (state, payload: any) {
            state.invoiceData.forEach((invoice: any) => {
                if (invoice.docId === payload) {
                    invoice.invoicePaid = true;
                    invoice.invoicePending = false;
                }
            });
        },
        [mutationTypes.UpdateStatusToPending] (state, payload: any) {
            state.invoiceData.forEach((invoice: any) => {
                if (invoice.docId === payload) {
                    invoice.invoicePaid = false;
                    invoice.invoicePending = true;
                    invoice.invoiceDraft = false;
                }
            });
        },
    },
    actions: {
    },

})

export default store
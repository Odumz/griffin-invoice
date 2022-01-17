import { createStore } from 'vuex'
import * as actionTypes from './constants/actions'
import * as mutationTypes from './constants/mutations'
import { computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/firebaseInit';
import { ToggleInvoice, ToggleEditInvoice } from './constants/mutations';

const store = createStore({
    state: {
        invoiceModal:<boolean> false,
        invoiceData:<any> [],
        modalActive:<boolean> false,
        invoicesLoaded:<boolean> false,
        currentInvoiceArray: null,
        editInvoice:<boolean> false,
    },
    getters: {
        getInvoiceModal: (state) => {
            return computed(() => {
                return state.invoiceModal
            })
        },
        getInvoiceData: (state) => {
            return computed(() => {
                return state.invoiceData
            })
        },
        getInvoicesLoaded: (state) => {
            return computed(() => {
                return state.invoicesLoaded
            })
        },
        getModalActive: (state) => {
            return computed(() => {
                return state.modalActive
            })
        },
        getEditInvoice: (state) => {
            return computed(() => {
                return state.editInvoice
            })
        },
        getcurrentInvoiceArray: (state) => {
            return computed(() => {
                return state.currentInvoiceArray
            })
        },
    },
    mutations: {
        [mutationTypes.ToggleInvoice] (state) {
            state.invoiceModal = !state.invoiceModal;
        },
        [mutationTypes.ToggleModal] (state) {
            state.modalActive = !state.modalActive;
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
        async [actionTypes.GetInvoices] ({ commit, state }) {
            // const getData:any = db.collection('invoices').get();

            const getData:any = await getDocs(collection(db, 'invoices'));
            getData.forEach((doc:any) => {
                if (!state.invoiceData.some((invoice:any) => invoice.docId === doc.id)) {
                    const data:any = {
                        docId: doc.id,
                        invoiceId: doc.data().invoiceId,
                        billerStreetAddress: doc.data().billerStreetAddress,
                        billerCity: doc.data().billerCity,
                        billerZipCode: doc.data().billerZipCode,
                        billerCountry: doc.data().billerCountry,
                        clientName: doc.data().clientName,
                        clientEmail: doc.data().clientEmail,
                        clientStreetAddress: doc.data().clientStreetAddress,
                        clientCity: doc.data().clientCity,
                        clientZipCode: doc.data().clientZipCode,
                        clientCountry: doc.data().clientCountry,
                        invoiceDateUnix: doc.data().invoiceDateUnix,
                        invoiceDate: doc.data().invoiceDate,
                        paymentTerms: doc.data().paymentTerms,
                        paymentDueDateUnix: doc.data().paymentDueDateUnix,
                        paymentDueDate: doc.data().paymentDueDate,
                        productDescription: doc.data().productDescription,
                        invoiceItemList: doc.data().invoiceItemList,
                        invoiceTotal: doc.data().invoiceTotal,
                        invoicePending: doc.data().invoicePending,
                        invoiceDraft: doc.data().invoiceDraft,
                        invoicePaid: doc.data().invoicePaid,
                    };

                    commit(mutationTypes.SetInvoiceData, data)
                }
            });
            commit(mutationTypes.InvoicesLoaded);
        },
        async [actionTypes.UpdateInvoice] ({ commit, dispatch }, { docId, routeId }) {
            commit(mutationTypes.DeleteInvoice, docId);
            await dispatch(actionTypes.GetInvoices);
            commit(mutationTypes.ToggleInvoice)
            commit(mutationTypes.ToggleEditInvoice)
            commit(mutationTypes.SetCurrentInvoice, routeId)
        },
    },

})

export default store
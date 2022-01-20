<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import * as mutationTypes from '../store/constants/mutations';

const store:any = useStore()

const closeModal:any = () => {
    store.commit(mutationTypes.ToggleModal)
}

const editInvoice = computed(() => {
    return store.getters.getEditInvoice.value
})

const closeInvoice:any = () => {
    store.commit(mutationTypes.ToggleModal)
    store.commit(mutationTypes.ToggleInvoice)
    if (editInvoice.value) {
        store.commit(mutationTypes.ToggleEditInvoice)
    }
}
</script>

<template>
    <div class="modal flex">
        <div class="modal-content bg-dark-purple bg-opacity-90">
            <p>Are you sure you to exit? Your changes will not be saved?</p>
            <div class="actions flex">
                <button @click.prevent="closeModal" class="bg-purple">Return</button>
                <button @click.prevent="closeInvoice" class="bg-red">Close</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    @apply z-[100] fixed justify-center items-center h-screen w-full;

    .modal-content {
        @apply rounded-[20px] py-12 px-8 text-white;
        p {
            @apply text-center;
        }

        .actions {
            @apply mt-6;
            button {
                @apply flex-[1] py-2 px-3 mx-3;
            }
        }
    }
}
</style>
<script setup lang="ts">
</script>

<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<style lang="scss" scoped>
.loading {
    @apply absolute top-0 left-0 z-[101] h-full w-full flex justify-center items-center bg-black bg-opacity-50;
    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }

    span {
        @apply block w-[60px] h-[60px] mx-auto border-[3px] border-opacity-0 border-y-white rounded-[50%] animate-[spin_1000ms_ease_infinite];
    }
}
</style>
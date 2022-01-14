<template>
    <div>
        <header class="flex">
            <div class="branding flex">
                <img src="../assets/file-invoice-dollar-solid.png" width="30px" height="30px" alt="Branding">
            </div>
        </header>
    </div>
</template>

<style lang="scss" scoped>
header {
    @apply z-99 flex-row bg-dark-purple dl:min-h-full dl:min-w-45 dl:flex-col dl:rounded-tr-[20px] dl:rounded-b-[20px];
    .branding {
        @apply rounded-tr-[20px] rounded-br-[20px] bg-purple justify-center p-6 dl:w-full;
        img {
            @apply w-auto h-[30px]
        }
    }
}
</style>
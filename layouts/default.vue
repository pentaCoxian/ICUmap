<template>
    <div class="flex flex-col">
        <div class="py-4 border-black border-b-0.5">
            <div class="ml-8 flex gap-4 items-center">
                <NuxtLink to="/map"><div class="text-xl">⚓ICUのmap</div></NuxtLink>
                <div class="text-rg ml-4">ラベル押すと詳細出るよ</div>
                <!-- <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/map">map</NuxtLink>
                <NuxtLink to="/omap">ol</NuxtLink> -->
            </div>
        </div>

        <slot />

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
<template>
    <div class="flex flex-col">
        <div class="flex flex-row sticky top-0 z-50 bg-blue-600">
            <div class="ml-5 my-auto text-xl md:text-2xl font-semilight underline "><NuxtLink to="/" class="bg-black text-white p-1">ICUMAP.com</NuxtLink></div>
            <div class="flex ml-5 text-lg my-4 font-semibold leading-4 text-white">Made<br> By<br>Pentacoxian</div>
        </div>
        <slot />
    </div>
</template>

<script setup>

</script>

<style  scoped>
    body {
      font-family: "Inter" ;
      font-weight: "bold";
      font-size: 'large';
    }
</style>
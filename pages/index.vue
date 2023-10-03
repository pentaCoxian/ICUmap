<template>
    <div>
        <div class="container mx-auto">
            <div class="flex content-center justify-center align-center" ref="rootE1">
                <div class="text-4xl"><NuxtLink to="/map">>Click here for map&lt </NuxtLink></div>
            </div>
        </div>
    
    </div>
</template>

<script setup>
useHead({
  title: 'ICU MAP 構内図',
  meta: [
    { name: 'description', content: '国際基督教大学の構内図。各館の詳細もみれます。' }
  ]
})
useSeoMeta({
  title: 'ICU MAP - ICU構内図 マップ',
  ogTitle: 'ICU キャンパスマップ',
  description: 'ICUキャンパスの地図です。館内の情報も含め閲覧できます',
  ogDescription: '非公式ICU地図 各館の構内図も閲覧できます。',
})
await navigateTo({path:'map'})

</script>

<style lang="css" scoped>

</style>
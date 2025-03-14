<script setup>
const { data: home } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: "Samui Kitchen - Authentic Thai Cuisine",
  description:
    "Experience the authentic flavors of Thailand at Samui Kitchen. Fresh ingredients, traditional recipes, and fast delivery.",
});
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

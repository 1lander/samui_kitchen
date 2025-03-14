<script setup>
const { data: about } = await useAsyncData(() =>
  queryCollection("content").path("/about").first()
);

useSeoMeta({
  title: "About Us - Samui Kitchen",
  description:
    "Learn about our journey, our chefs, and our commitment to authentic Thai cuisine at Samui Kitchen.",
});
</script>

<template>
  <ContentRenderer v-if="about" :value="about" />
  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

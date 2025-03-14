<script setup>
const { data: contact } = await useAsyncData(() =>
  queryCollection("content").path("/contact").first()
);

useSeoMeta({
  title: "Contact Us - Samui Kitchen",
  description:
    "Contact us for reservations, inquiries, or to place an order. We're here to serve you with authentic Thai cuisine.",
});
</script>

<template>
  <ContentRenderer v-if="contact" :value="contact" />
  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

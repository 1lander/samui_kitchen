<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="relative h-64 md:h-80 mb-12 rounded-lg overflow-hidden">
    <NuxtImg
      :src="image"
      :alt="title"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute inset-0 flex flex-col justify-center items-center text-white"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-2">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-xl md:text-2xl">{{ subtitle }}</p>
    </div>
  </div>
</template> 
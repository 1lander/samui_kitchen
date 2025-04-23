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
      default: ""
    }
  });
</script>

<template>
  <div class="relative mb-12 h-64 overflow-hidden md:h-80 md:rounded-lg">
    <NuxtImg :src="image" :alt="title" class="h-full w-full object-cover" />
    <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-1 text-white">
      <h1 class="mb-2 text-center text-3xl font-bold md:text-5xl">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-center text-lg md:text-2xl">{{ subtitle }}</p>
      <div class="mt-6">
        <slot />
      </div>
    </div>
  </div>
</template>

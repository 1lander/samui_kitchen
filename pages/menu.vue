<script setup>
const { data: menuData } = await useAsyncData(() =>
  queryCollection("content").path("/menu").first()
);

// Access the menu data from the body property
const menu = computed(() => menuData.value?.body);

useSeoMeta({
  title: "Menu - Samui Kitchen",
  description:
    "Explore our extensive menu of authentic Thai dishes, from appetizers to desserts. All made with fresh ingredients and traditional recipes.",
});
</script>

<template>
  <div v-if="menu" class="container mx-auto px-4 py-12">
    <!-- Page Header -->
    <div class="relative h-64 md:h-80 mb-12 rounded-lg overflow-hidden">
      <img
        :src="menu.pageHeader.image"
        :alt="menu.pageHeader.title"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          {{ menu.pageHeader.title }}
        </h1>
        <p class="text-xl md:text-2xl">{{ menu.pageHeader.subtitle }}</p>
      </div>
    </div>

    <!-- Menu Description -->
    <div class="max-w-3xl mx-auto mb-12 text-center">
      <p class="text-lg text-gray-700">{{ menu.description }}</p>
    </div>

    <!-- Menu Categories -->
    <div class="max-w-5xl mx-auto">
      <div
        v-for="(category, index) in menu.categories"
        :key="index"
        class="mb-12"
      >
        <h2
          class="text-3xl font-bold mb-6 text-center border-b-2 border-pink-500 pb-2"
        >
          {{ category.name }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold">{{ item.name }}</h3>
              <div class="text-right">
                <span class="text-lg font-medium text-pink-600">
                  € {{ item.price.toFixed(2) }}
                </span>
              </div>
            </div>
            <p v-if="item.description" class="text-gray-600 mt-1">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

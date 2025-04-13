<script setup>
const { data: menuData } = await useAsyncData(() =>
  queryCollection("content").path("/menu").first()
);

// Access the menu data from the body property
const menu = computed(() => menuData.value?.body);

const { t } = useI18n();

useSeoMeta({
  title: t('menu.pageTitle') + " - Samui Kitchen",
  description: t('menu.description'),
});
</script>

<template>
  <div v-if="menu" class="container mx-auto px-4 py-12">
    <div class="relative h-64 md:h-80 mb-12 rounded-lg overflow-hidden">
      <NuxtImg
        :src="menu.pageHeader.image"
        :alt="$t(menu.pageHeader.title)"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          {{ $t(menu.title) }}
        </h1>
        <p class="text-xl md:text-2xl">{{ $t(menu.pageHeader.subtitle) }}</p>
      </div>
    </div>

    <!-- Menu Description -->
    <div class="max-w-3xl mx-auto mb-12 text-center">
      <p class="text-lg text-gray-700">{{ $t(menu.description) }}</p>
    </div>

    <!-- Menu Categories -->
    <div class="max-w-5xl mx-auto">
      <div
        v-for="(category, index) in menu.categories"
        :key="index"
        class="mb-12"
      >
        <h2
          class="text-3xl font-bold mb-6 text-center border-b-2 border-secondary pb-2"
        >
          {{ $t(category.name) }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold">{{ $t(item.name) }}</h3>
              <div class="text-right">
                <span class="text-lg font-medium text-secondary">
                  € {{ item.price.toFixed(2) }}
                </span>
                <span v-if="item.secondPrice" class="text-lg font-medium text-secondary ml-1">
                  / € {{ item.secondPrice.toFixed(2) }}
                </span>
              </div>
            </div>
            <p v-if="item.description" class="text-secondary mt-1">
              {{ $t(item.description) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">{{ $t('menu.loading') }}</p>
  </div>
</template>

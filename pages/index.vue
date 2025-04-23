<script setup lang="ts">
import type { HomeContent, MenuContent } from "~/types";
const { t } = useI18n();

const { data: homeData } = await useAsyncData(() =>
  queryContent<HomeContent>("/home").findOne()
);
const { data: menuData } = await useAsyncData(() =>
  queryContent<MenuContent>("menu").findOne()
);

const home = computed(() => homeData.value);
const popularDishes = computed(() =>
  menuData.value?.categories.flatMap((category) =>
    category.items.filter((item) => item.isPopular)
  )
);

useSeoMeta({
  title: t("home.pageTitle") + " - Samui Kitchen",
  description: t("home.pageSubtitle"),
});
</script>

<template>
  <div v-if="home">
    <PageHeader
      :image="home.hero.image"
      :title="t('home.pageTitle')"
      :subtitle="t('home.pageSubtitle')"
    >
      <NuxtLink
        :to="home.hero.cta"
        class="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full text-lg font-medium transition"
      >
        {{ t("home.menuButton") }}
      </NuxtLink>
    </PageHeader>

    <section class="py-16 px-4 max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">
            {{ t("home.introduction.title") }}
          </h2>
          <p class="text-lg text-gray-700">
            {{ t("home.introduction.content") }}
          </p>
        </div>
        <div>
          <NuxtImg
            :src="home.introduction.image"
            alt="Samui Kitchen restaurant"
            class="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in home.features"
            :key="index"
            class="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <div class="text-primary mb-4">
              <Icon :name="`mdi:${feature.icon}`" class="text-4xl" />
            </div>
            <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Dishes Section -->
    <section class="py-16 px-4 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-2">{{ t("home.menu.title") }}</h2>
        <p class="text-lg text-gray-600">{{ t("home.menu.subtitle") }}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(dish, index) in popularDishes"
          :key="index"
          class="bg-white rounded-lg overflow-hidden shadow-lg"
        >
          <NuxtImg
            :src="dish.image"
            :alt="dish.name"
            class="w-full h-64 object-cover"
          />
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-bold">{{ t(dish.name) }}</h3>
              <span class="text-red-600 font-semibold"
                >{{ dish.price.toFixed(2) }} €</span
              >
            </div>
            <p v-if="dish.description" class="text-gray-600">
              {{ t(dish.description) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          {{ t("home.testimonials.title") }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(quote, index) in home.testimonials.quotes"
            :key="index"
            class="bg-white p-8 rounded-lg shadow-md"
          >
            <div class="text-yellow-500 mb-4">
              <Icon name="mdi:star" class="text-xl" />
              <Icon name="mdi:star" class="text-xl" />
              <Icon name="mdi:star" class="text-xl" />
              <Icon name="mdi:star" class="text-xl" />
              <Icon name="mdi:star" class="text-xl" />
            </div>
            <p class="text-gray-700 italic mb-4">"{{ quote.text }}"</p>
            <p class="font-medium">— {{ quote.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <!-- <section class="py-16 bg-red-600 text-white">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-3xl font-bold mb-3">{{ home.cta.title }}</h2>
        <p class="text-xl mb-8">{{ home.cta.subtitle }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink 
            v-for="(button, index) in home.cta.buttons" 
            :key="index" 
            :to="button.link" 
            :class="[
              'px-8 py-3 rounded-full text-lg font-medium transition',
              button.primary ? 'bg-white text-red-600 hover:bg-gray-100' : 'border-2 border-white hover:bg-white hover:text-red-600'
            ]"
          >
            {{ button.text }}
          </NuxtLink>
        </div>
      </div>
    </section> -->
  </div>
  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

<style scoped>
.Icon {
  display: inline-block;
}
</style>

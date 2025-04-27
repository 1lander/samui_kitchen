<script setup lang="ts">
  import { formatPrice } from "~/helpers";
  import type { HomeContent, MenuContent } from "~/types";
  const { t } = useI18n();

  const { data: homeData } = await useAsyncData(() => queryContent<HomeContent>("/home").findOne());
  const { data: menuData } = await useAsyncData(() => queryContent<MenuContent>("/menu").findOne());

  const home = computed(() => homeData.value);
  const popularDishes = computed(() =>
    menuData.value?.categories.flatMap((category) => category.items.filter((item) => item.isPopular))
  );

  useSeoMeta({
    title: t("home.pageTitle") + " - Koh Samui kitchen",
    description: t("home.pageSubtitle")
  });
</script>

<template>
  <div v-if="home">
    <PageHeader :image="home.pageHeader.image" :title="t('home.pageTitle')" :subtitle="t('home.pageSubtitle')">
      <NuxtLink
        :to="$localePath(home.pageHeader.cta ?? '/')"
        class="rounded-full bg-primary px-8 py-3 text-lg font-medium text-white transition hover:bg-primary/80"
      >
        {{ t("home.menuButton") }}
      </NuxtLink>
    </PageHeader>

    <div class="mx-auto flex max-w-5xl flex-col gap-20">
      <section>
        <div class="grid items-center gap-12 md:grid-cols-2">
          <div class="px-3 text-lg text-gray-700 md:px-0">
            {{ t("home.introduction.content") }}
          </div>
          <NuxtImg
            :src="home.introduction.image"
            alt="Koh Samui kitchen restaurant"
            class="h-auto w-full shadow-xl md:rounded-lg"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-8 text-center text-3xl font-bold">
          {{ t("home.features.title") }}
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(feature, index) in home.features"
            :key="index"
            class="rounded-lg bg-white p-8 text-center shadow-md"
          >
            <div class="mb-4 text-primary">
              <Icon :name="`mdi:${feature.icon}`" class="text-4xl" />
            </div>
            <h3 class="mb-3 text-xl font-bold">{{ t(feature.title) }}</h3>
            <p class="text-gray-600">{{ t(feature.description) }}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-8 text-center text-3xl font-bold">{{ t("home.menu.title") }}</h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(dish, index) in popularDishes"
            :key="index"
            class="overflow-hidden bg-white shadow-lg md:rounded-lg"
          >
            <NuxtImg :src="dish.image" :alt="dish.name" class="h-64 w-full object-cover" />
            <div class="p-6">
              <div class="mb-2 flex items-center justify-between">
                <h3 class="text-xl font-bold">{{ t(dish.name) }}</h3>
                <span class="font-semibold text-primary">{{ formatPrice(dish.price) }}</span>
              </div>
              <p v-if="dish.description" class="text-gray-600">
                {{ t(dish.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-8 text-center text-3xl font-bold">
          {{ t("home.testimonials.title") }}
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(quote, index) in home.testimonials.quotes"
            :key="index"
            class="rounded-lg bg-white p-8 shadow-md"
          >
            <p class="mb-4 italic text-gray-700">"{{ quote.text }}"</p>
            <p class="font-medium">— {{ quote.author }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const { data: homeData } = await useAsyncData(() =>
  queryCollection("content").path("/home").first()
);
const home = computed(() => homeData.value?.body);

useSeoMeta({
  title: "Samui Kitchen - Authentic Thai Cuisine",
  description:
    "Experience the authentic flavors of Thailand at Samui Kitchen. Fresh ingredients, traditional recipes, and fast delivery.",
});
</script>

<template>
  <div v-if="home">
    <!-- Hero Section -->
    <section class="relative">
      <div class="h-[600px] w-full">
        <img :src="home.hero.image" alt="Thai cuisine" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="text-center text-white px-4 max-w-4xl">
            <h1 class="text-5xl font-bold mb-4">{{ home.hero.title }}</h1>
            <p class="text-xl mb-8">{{ home.hero.subtitle }}</p>
            <NuxtLink :to="home.hero.cta.link" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transition">
              {{ home.hero.cta.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="py-16 px-4 max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">{{ home.introduction.title }}</h2>
          <p class="text-lg text-gray-700">{{ home.introduction.content }}</p>
        </div>
        <div>
          <img :src="home.introduction.image" alt="Samui Kitchen restaurant" class="rounded-lg shadow-xl w-full h-auto" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in home.features" :key="index" class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-red-600 mb-4">
              <Icon :name="feature.icon" class="text-4xl" />
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
        <h2 class="text-3xl font-bold mb-2">{{ home.popularDishes.title }}</h2>
        <p class="text-lg text-gray-600">{{ home.popularDishes.subtitle }}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(dish, index) in home.popularDishes.dishes" :key="index" class="bg-white rounded-lg overflow-hidden shadow-lg">
          <img :src="dish.image" :alt="dish.name" class="w-full h-64 object-cover" />
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-bold">{{ dish.name }}</h3>
              <span class="text-red-600 font-semibold">{{ dish.price }}</span>
            </div>
            <p class="text-gray-600">{{ dish.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ home.testimonials.title }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(quote, index) in home.testimonials.quotes" :key="index" class="bg-white p-8 rounded-lg shadow-md">
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
    <section class="py-16 bg-red-600 text-white">
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
    </section>
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

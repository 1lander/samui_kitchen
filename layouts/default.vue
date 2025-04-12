<script setup>
const { locales, setLocale } = useI18n()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-pink-50">
    <!-- Header with pastel pink colors -->
    <header class="bg-gradient-to-r from-pink-300 to-pink-200 text-pink-900 shadow-lg">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold">Samui Kitchen</h1>
            <p class="ml-4 italic text-pink-700/80">Authentic Thai Flavors</p>
          </div>
          <nav class="hidden md:block">
            <ul class="flex space-x-6">
              <li><NuxtLink to="/" class="hover:text-pink-600 transition">Home</NuxtLink></li>
              <li><NuxtLink to="/menu" class="hover:text-pink-600 transition">Menu</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-pink-600 transition">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-pink-600 transition">Contact</NuxtLink></li>
            </ul>
            <div>
              <button v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
                {{ locale.name }}
              </button>
              <h1>{{ $t('welcome') }}</h1>
            </div>
          </nav>
          <!-- Mobile menu button -->
          <button class="md:hidden text-pink-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <CustomFooter />
  </div>
</template>

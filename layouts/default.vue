<script setup>
const { locales, locale, setLocale } = useI18n()

const flagEmoji = {
  nl: '🇧🇪',
  en: '🇬🇧',
  th: '🇹🇭',
}

// Handle locale change
const handleLocaleChange = (event) => {
  setLocale(event.target.value)
}
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
            <ul class="flex space-x-6 items-center">
              <li><NuxtLink to="/" class="hover:text-pink-600 transition">Home</NuxtLink></li>
              <li><NuxtLink to="/menu" class="hover:text-pink-600 transition">Menu</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-pink-600 transition">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-pink-600 transition">Contact</NuxtLink></li>
              <li>
                <div class="relative ml-4">
                  <select 
                    :value="locale" 
                    class="appearance-none bg-pink-100 border border-pink-300 text-pink-900 py-1 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 cursor-pointer"
                    @change="handleLocaleChange" 
                  >
                    <option 
                      v-for="loc in locales" 
                      :key="loc.code" 
                      :value="loc.code"
                      class="flex items-center"
                    >
                      {{ flagEmoji[loc.code] }} {{ loc.name }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </li>
            </ul>
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

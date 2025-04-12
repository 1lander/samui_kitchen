<script setup>
const { locales, locale, setLocale } = useI18n()

const flagEmoji = {
  nl: '🇧🇪',
  en: '🇬🇧',
  th: '🇹🇭',
}

const handleLocaleChange = (event) => {
  setLocale(event.target.value)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-[#F2EFE2] text-teal-800 shadow-lg">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img src="/img/logo.png" alt="Koh Samui Kitchen Logo" class="h-24">
            <div>
              <h1 class="text-3xl font-bold text-teal-800 leading-none">Samui' Kitchen</h1>
              <div class="text-teal-600">เกาะสมุย‘ คิทเช่น</div>
            </div>
          </div>
          <nav class="hidden md:block">
            <ul class="flex space-x-6 items-center">
              <li><NuxtLink to="/" class="hover:text-teal-600 font-medium transition">{{ $t('header.home') }}</NuxtLink></li>
              <li><NuxtLink to="/menu" class="hover:text-teal-600 font-medium transition">{{ $t('header.menu') }}</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-teal-600 font-medium transition">{{ $t('header.about') }}</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-teal-600 font-medium transition">{{ $t('header.contact') }}</NuxtLink></li>
              <li>
                <div class="relative ml-4">
                  <select 
                    :value="locale" 
                    class="appearance-none bg-white text-teal-800 py-1 px-3 pr-8 rounded-md shadow-sm cursor-pointer"
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
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
          <!-- Mobile menu button -->
          <button class="md:hidden text-teal-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <CustomFooter />
  </div>
</template>

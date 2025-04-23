<script setup>
  const { locales, locale, setLocale } = useI18n();

  const flagEmoji = {
    nl: "🇧🇪",
    en: "🇬🇧",
    th: "🇹🇭"
  };

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
  };

  // Mobile menu state
  const isMobileMenuOpen = ref(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="relative z-10 bg-background text-primary shadow-lg">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/" class="font-medium transition hover:text-secondary">
              <NuxtImg src="/img/logo.png" alt="Koh Samui Kitchen Logo" class="h-24" />
            </NuxtLink>

            <div>
              <h1 class="text-2xl font-bold leading-none text-primary md:text-3xl">
                {{ $t("brand.name") }}
              </h1>
              <div class="text-secondary text-sm md:text-lg">{{ $t("brand.tagline") }}</div>
            </div>
          </div>
          <nav class="hidden md:block">
            <ul class="flex items-center space-x-6">
              <li>
                <NuxtLink to="/" class="font-medium transition hover:text-secondary">
                  {{ $t("header.home") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/menu" class="font-medium transition hover:text-secondary">
                  {{ $t("header.menu") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="font-medium transition hover:text-secondary">
                  {{ $t("header.contact") }}
                </NuxtLink>
              </li>
              <li>
                <div class="relative ml-4">
                  <select
                    :value="locale"
                    class="cursor-pointer appearance-none rounded-md bg-white px-3 py-1 pr-8 text-primary shadow-sm"
                    @change="handleLocaleChange"
                  >
                    <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="flex items-center">
                      {{ flagEmoji[loc.code] }} {{ loc.name }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
          <!-- Mobile menu button -->
          <button class="relative z-30 text-primary md:hidden" @click="toggleMobileMenu">
            <svg
              v-if="!isMobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
      @click="toggleMobileMenu"
    />

    <!-- Mobile menu -->
    <div
      class="fixed right-0 top-0 z-30 flex h-full w-64 transform flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out md:hidden"
      :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex-grow px-4 pt-20">
        <ul class="space-y-4">
          <li>
            <NuxtLink to="/" class="block py-2 font-medium transition hover:text-secondary" @click="toggleMobileMenu">
              {{ $t("header.home") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/menu"
              class="block py-2 font-medium transition hover:text-secondary"
              @click="toggleMobileMenu"
            >
              {{ $t("header.menu") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="block py-2 font-medium transition hover:text-secondary"
              @click="toggleMobileMenu"
            >
              {{ $t("header.contact") }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Language picker at bottom -->
      <div class="border-t border-gray-200 px-4 py-4">
        <div class="relative">
          <select
            :value="locale"
            class="w-full cursor-pointer appearance-none rounded-md bg-white px-3 py-1 pr-8 text-primary shadow-sm"
            @change="handleLocaleChange"
          >
            <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="flex items-center">
              {{ flagEmoji[loc.code] }} {{ loc.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <main class="container mx-auto flex-grow py-8 md:px-8">
      <slot />
    </main>

    <CustomFooter />
  </div>
</template>

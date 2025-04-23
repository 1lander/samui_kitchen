<script setup>
const { locales, locale, setLocale } = useI18n();

const flagEmoji = {
  nl: "🇧🇪",
  en: "🇬🇧",
  th: "🇹🇭",
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
  <div class="min-h-screen flex flex-col">
    <header class="bg-background text-primary shadow-lg relative z-10">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <NuxtLink to="/" class="hover:text-secondary font-medium transition"
              ><NuxtImg
                src="/img/logo.png"
                alt="Koh Samui Kitchen Logo"
                class="h-24"
              />
            </NuxtLink>

            <div>
              <h1 class="text-3xl font-bold text-primary leading-none">
                {{ $t("brand.name") }}
              </h1>
              <div class="text-secondary">{{ $t("brand.tagline") }}</div>
            </div>
          </div>
          <nav class="hidden md:block">
            <ul class="flex space-x-6 items-center">
              <li>
                <NuxtLink
                  to="/"
                  class="hover:text-secondary font-medium transition"
                  >{{ $t("header.home") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/menu"
                  class="hover:text-secondary font-medium transition"
                  >{{ $t("header.menu") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="hover:text-secondary font-medium transition"
                  >{{ $t("header.contact") }}</NuxtLink
                >
              </li>
              <li>
                <div class="relative ml-4">
                  <select
                    :value="locale"
                    class="appearance-none bg-white text-primary py-1 px-3 pr-8 rounded-md shadow-sm cursor-pointer"
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
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
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
          <button
            @click="toggleMobileMenu"
            class="md:hidden text-primary z-30 relative"
          >
            <svg
              v-if="!isMobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      @click="toggleMobileMenu"
    />

    <!-- Mobile menu -->
    <div
      class="fixed top-0 right-0 h-full w-64 bg-background shadow-xl z-30 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="pt-20 px-4 flex-grow">
        <ul class="space-y-4">
          <li>
            <NuxtLink
              @click="toggleMobileMenu"
              to="/"
              class="block hover:text-secondary font-medium transition py-2"
              >{{ $t("header.home") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              @click="toggleMobileMenu"
              to="/menu"
              class="block hover:text-secondary font-medium transition py-2"
              >{{ $t("header.menu") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              @click="toggleMobileMenu"
              to="/contact"
              class="block hover:text-secondary font-medium transition py-2"
              >{{ $t("header.contact") }}</NuxtLink
            >
          </li>
        </ul>
      </div>

      <!-- Language picker at bottom -->
      <div class="px-4 py-4 border-t border-gray-200">
        <div class="relative">
          <select
            :value="locale"
            class="appearance-none bg-white text-primary py-1 px-3 pr-8 rounded-md shadow-sm cursor-pointer w-full"
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
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <CustomFooter />
  </div>
</template>

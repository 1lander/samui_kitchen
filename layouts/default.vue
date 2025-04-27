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

  const isMobileMenuOpen = ref(false);

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const links = [
    {
      name: "header.home",
      path: "/"
    },
    {
      name: "header.menu",
      path: "/menu"
    },
    {
      name: "header.contact",
      path: "/contact"
    },
    {
      name: "header.order",
      path: "/order"
    }
  ];
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="relative z-10 bg-background text-primary shadow-lg">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink :to="$localePath('/')" class="font-medium transition hover:text-secondary">
              <NuxtImg src="/img/logo.png" alt="Koh Koh Samui kitchen Logo" class="h-24" />
            </NuxtLink>
            <div>
              <h1 class="text-2xl font-bold leading-none text-primary md:text-3xl">
                {{ $t("brand.name") }}
              </h1>
              <div class="text-sm text-secondary md:text-lg">{{ $t("brand.tagline") }}</div>
            </div>
          </div>
          <nav class="hidden md:block">
            <ul class="flex items-center space-x-6">
              <li v-for="link in links" :key="link.name">
                <NuxtLink :to="$localePath(link.path)" class="font-medium transition hover:text-secondary">
                  {{ $t(link.name) }}
                </NuxtLink>
              </li>
              <li>
                <div class="relative mr-4">
                  <select
                    :value="locale"
                    class="cursor-pointer appearance-none rounded-md border-primary bg-white px-3 py-1 pr-8 text-primary shadow-sm"
                    @change="handleLocaleChange"
                  >
                    <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="flex items-center">
                      {{ flagEmoji[loc.code] }} {{ loc.name }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
          </nav>
          <!-- Mobile menu button -->
          <button class="relative z-40 text-primary md:hidden" @click="toggleMobileMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
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
      <div class="flex-grow px-4 pt-8">
        <select
          :value="locale"
          class="w-full cursor-pointer appearance-none rounded-md border-primary bg-white px-3 py-1 pr-8 text-primary shadow-sm"
          @change="handleLocaleChange"
        >
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="flex items-center">
            {{ flagEmoji[loc.code] }} {{ loc.name }}
          </option>
        </select>
        <ul class="space-y-4 pt-10 text-primary">
          <li v-for="link in links" :key="link.name">
            <NuxtLink
              :to="$localePath(link.path)"
              class="block py-2 font-medium transition hover:text-secondary"
              @click="toggleMobileMenu"
            >
              {{ $t(link.name) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <main class="container mx-auto flex-grow py-8 md:px-8">
      <slot />
    </main>

    <OrderWidget v-if="!$route.path.includes('/order')" />

    <CustomFooter />
  </div>
</template>

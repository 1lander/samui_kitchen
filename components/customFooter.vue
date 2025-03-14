<script setup>
const { data: footerContent } = await useAsyncData(() =>
  queryCollection("content").path("/footer").first()
);

const footerData = computed(() => footerContent.value?.body);
</script>

<template>
  <footer class="bg-pink-200 text-pink-900">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-pink-700">
            {{ footerData.brand.name }}
          </h3>
          <p>{{ footerData.brand.tagline }}</p>
          <div class="mt-4 flex space-x-4">
            <a
              v-for="social in footerData.brand.socialMedia"
              :key="social.name"
              :href="social.url"
              class="text-pink-800 hover:text-pink-600"
            >
              <span class="sr-only">{{ social.name }}</span
              >{{ social.shortName }}
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4 text-pink-700">
            {{ footerData.hours.title }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(schedule, index) in footerData.hours.schedule"
              :key="index"
            >
              {{ schedule }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4 text-pink-700">
            {{ footerData.contact.title }}
          </h3>
          <address class="not-italic">
            <p
              v-for="(line, index) in footerData.contact.address"
              :key="index"
            >
              {{ line }}
            </p>
            <p>Phone: {{ footerData.contact.phone }}</p>
            <p>Email: {{ footerData.contact.email }}</p>
          </address>
        </div>
      </div>
      <div class="border-t border-pink-300 mt-8 pt-6 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} {{ footerData.brand.name }}.
          {{ footerData.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>

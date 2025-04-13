<script setup>
const { data: footerContent } = await useAsyncData(() =>
  queryCollection("content").path("/footer").first()
);

const footerData = computed(() => footerContent.value?.body);
</script>

<template>
  <footer class="bg-background text-text shadow-lg">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-secondary">
            {{ $t('brand.name') }}
          </h3>
          <p>{{ $t('footer.brand.tagline') }}</p>
          <div class="mt-4 flex space-x-4">
            <a
              v-for="social in footerData.brand.socialMedia"
              :key="social.name"
              :href="social.url"
              class="text-secondary hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">{{ social.name }}</span>
              <Icon 
                v-if="social.name === 'Facebook'" 
                name="mdi:facebook" 
                class="w-6 h-6"
              />
              <Icon 
                v-if="social.name === 'Instagram'" 
                name="mdi:instagram" 
                class="w-6 h-6"
              />
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4 text-secondary">
            {{ $t('footer.hours.title') }}
          </h3>
          <ul class="space-y-2">
            <li>
              {{ $t('footer.hours.weekdays') }} {{ footerData.hours.weekdays }}
            </li>
            <li>
              {{ $t('footer.hours.weekends') }} {{ footerData.hours.weekends }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4 text-secondary">
            {{ $t('footer.contact.title') }}
          </h3>
          <address class="not-italic">
            <p
              v-for="(line, index) in footerData.contact.address"
              :key="index"
            >
              {{ line }}
            </p>
            <p>{{ $t('footer.contact.phone') }}: {{ footerData.contact.phone }}</p>
            <p>{{ $t('footer.contact.email') }}: {{ footerData.contact.email }}</p>
          </address>
        </div>
      </div>
      <div class="border-t border-secondary mt-8 pt-6 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} {{ footerData.brand.name }}.
          {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { data } = await useAsyncData('contact', () => queryContent('/contact').findOne())

const contactData = computed(() => data.value);
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
              v-for="social in contactData.contactInfo.social"
              :key="social.platform"
              :href="social.url"
              class="text-secondary hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">{{ social.platform }}</span>
              <Icon 
                :name="`mdi:${social.icon}`" 
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
              {{ $t('footer.hours.weekdays') }} {{ contactData.hours.weekdays }}
            </li>
            <li>
              {{ $t('footer.hours.weekends') }} {{ contactData.hours.weekends }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4 text-secondary">
            {{ $t('footer.contact.title') }}
          </h3>
          <address class="not-italic">
            <p
              v-for="(line, index) in contactData.contactInfo.address"
              :key="index"
            >
              {{ line }}
            </p>
            <p>{{ $t('footer.contact.phone') }}: {{ contactData.contactInfo.phone }}</p>
            <p>{{ $t('footer.contact.email') }}: {{ contactData.contactInfo.email }}</p>
          </address>
        </div>
      </div>
      <div class="border-t border-secondary mt-8 pt-6 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} {{ $t('brand.name') }}.
          {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

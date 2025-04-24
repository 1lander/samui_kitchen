<script setup lang="ts">
  import type { ContactContent } from "~/types";
  const { data } = await useAsyncData(() => queryContent<ContactContent>("/contact").findOne());
  const { t } = useI18n();
  const contact = computed(() => data.value);
</script>

<template>
  <footer class="text-text mt-20 bg-background shadow-lg">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 class="mb-4 text-xl font-semibold text-secondary">
            {{ t("brand.name") }}
          </h3>
          <p>{{ t("brand.tagline") }}</p>
          <div class="mt-4 flex space-x-4">
            <a
              v-for="social in contact?.contactInfo?.social"
              :key="social.platform"
              :href="social.url"
              class="text-secondary hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">{{ social.platform }}</span>
              <Icon :name="`mdi:${social.icon}`" class="h-6 w-6" />
            </a>
          </div>
        </div>
        <div>
          <h3 class="mb-4 text-xl font-semibold text-secondary">
            {{ t("footer.hours.title") }}
          </h3>
          <ul class="space-y-2">
            <li>{{ t("footer.hours.weekdays") }} {{ contact?.hours?.weekdays }}</li>
            <li>{{ t("footer.hours.weekends") }} {{ contact?.hours?.weekends }}</li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 text-xl font-semibold text-secondary">
            {{ t("footer.contact.title") }}
          </h3>
          <address class="not-italic">
            <p v-for="(line, index) in contact?.contactInfo?.address" :key="index">
              {{ line }}
            </p>
            <p>
              {{ t("footer.contact.phone") }}:
              {{ contact?.contactInfo?.phone }}
            </p>
            <p>
              {{ t("footer.contact.email") }}:
              {{ contact?.contactInfo?.email }}
            </p>
          </address>
        </div>
      </div>
      <div class="mt-8 border-t border-secondary pt-6 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} {{ t("brand.name") }}.
          {{ t("footer.copyright") }}
        </p>
      </div>
    </div>
  </footer>
</template>

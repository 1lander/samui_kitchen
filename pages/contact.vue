<script setup lang="ts">
  import type { ContactContent } from "~/types";
  const { t } = useI18n();

  const { data } = await useAsyncData(() => queryContent<ContactContent>("/contact").findOne());

  const contact = computed(() => data.value);

  useSeoMeta({
    title: t("contact.pageTitle") + " - Samui Kitchen",
    description: t("contact.pageSubtitle")
  });

  interface FormData {
    [key: string]: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const formData = ref<FormData>({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const isSubmitting = ref(false);
  const isSubmitted = ref(false);
  const errorMessage = ref("");

  const submitForm = async () => {
    isSubmitting.value = true;
    errorMessage.value = "";

    try {
      // Here you would send the form data to your backend or API
      // For demonstration, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear form fields on success
      formData.value = {
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      };

      isSubmitted.value = true;
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : "An error occurred";
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<template>
  <div v-if="contact">
    <PageHeader
      :image="contact.pageHeader.image"
      :title="t('contact.pageTitle')"
      :subtitle="t('contact.pageSubtitle')"
    />

    <div class="mx-auto max-w-5xl px-4">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 class="mb-6 text-2xl font-semibold">
            {{ t("contact.info.title") }}
          </h2>

          <div class="space-y-4">
            <div class="flex items-start">
              <div class="mr-4 text-primary">
                <svg
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium">{{ t("contact.info.address") }}</h3>
                <div class="text-gray-600">
                  <p v-for="(line, index) in contact.contactInfo.address" :key="index">
                    {{ line }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div class="mr-4 text-primary">
                <svg
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium">{{ t("contact.info.phone") }}</h3>
                <p class="text-gray-600">{{ contact.contactInfo.phone }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="mr-4 text-primary">
                <svg
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium">{{ t("contact.info.email") }}</h3>
                <p class="text-gray-600">{{ contact.contactInfo.email }}</p>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="mb-6 text-2xl font-semibold">
              {{ t("contact.hours.title") }}
            </h2>
            <div class="space-y-2">
              <div class="flex justify-between border-b pb-2">
                <span>{{ t("contact.hours.weekdays") }}</span>
                <span class="font-medium">{{ contact.hours.weekdays }}</span>
              </div>
              <div class="flex justify-between border-b pb-2">
                <span>{{ t("contact.hours.weekends") }}</span>
                <span class="font-medium">{{ contact.hours.weekends }}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="mb-6 text-2xl font-semibold">
            {{ t("contact.form.title") }}
          </h2>

          <div v-if="isSubmitted" class="mb-6 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
            <p>{{ t("contact.form.success") }}</p>
          </div>

          <div v-if="errorMessage" class="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            <p>{{ errorMessage }}</p>
          </div>

          <form v-if="!isSubmitted" class="space-y-6" @submit.prevent="submitForm">
            <FormInput
              v-for="field in contact.formFields"
              :id="field.name"
              :key="field.name"
              v-model="formData[field.name]"
              :type="field.type"
              :label="t(field.label)"
              :required="field.required"
              :options="field.options"
            />

            <div>
              <button
                type="submit"
                class="hover:bg-primary-dark w-full rounded-md bg-primary px-4 py-2 text-white transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>{{ t("contact.form.submit") }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="mb-6 text-2xl font-semibold">{{ t("contact.mapTitle") }}</h2>
        <div class="h-96 overflow-hidden rounded-lg shadow-lg">
          <client-only>
            <LMap
              v-if="contact.location"
              style="height: 100%; width: 100%"
              :zoom="contact.location.zoom"
              :center="[contact.location.lat, contact.location.lng]"
            >
              <LControlZoom position="topright" />
              <LTileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
                layer-type="base"
                name="Voyager"
                attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <MapMarker :position="[contact.location.lat, contact.location.lng]" />
            </LMap>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.leaflet-container) {
    z-index: 1;
    font-family: inherit;
  }
</style>

<script setup>
const { data: contactData } = await useAsyncData(() =>
  queryCollection("content").path("/contact").first()
);
const contact = computed(() => contactData.value?.body);

useSeoMeta({
  title: "Contact Us - Samui Kitchen",
  description:
    "Contact us for reservations, inquiries, or to place an order. We're here to serve you with authentic Thai cuisine.",
});

const formData = ref({
  name: '',
  email: '',
  subject: 'General Inquiry',
  message: '',
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errorMessage = ref('');

const submitForm = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';
  
  try {
    // Here you would send the form data to your backend or API
    // For demonstration, we'll simulate a successful submission after a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear form fields on success
    formData.value = {
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    };
    
    isSubmitted.value = true;
  } catch (error) { // eslint-disable-line no-unused-vars
    errorMessage.value = 'There was an error submitting your message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="contact" class="container mx-auto px-4 py-12">
    <div class="relative h-64 md:h-80 mb-12 rounded-lg overflow-hidden">
      <NuxtImg
        :src="contact.pageHeader.image"
        :alt="$t('contact.pageHeader.title')"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          {{ $t('contact.pageTitle') }}
        </h1>
        <p class="text-xl md:text-2xl">{{ $t('contact.pageSubtitle') }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">{{ $t('contact.info.title') }}</h2>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="text-primary mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">{{ $t('contact.info.address') }}</h3>
              <div class="text-gray-600">
                <p v-for="(line, index) in contact.contactInfo.address" :key="index">{{ line }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="text-primary mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">{{ $t('contact.info.phone') }}</h3>
              <p class="text-gray-600">{{ contact.contactInfo.phone }}</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="text-primary mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">{{ $t('contact.info.email') }}</h3>
              <p class="text-gray-600">{{ contact.contactInfo.email }}</p>
            </div>
          </div>
        </div>

        <!-- Opening Hours -->
        <div class="mt-10">
          <h2 class="text-2xl font-semibold mb-6">{{ $t('contact.hours.title') }}</h2>
          <div class="space-y-2">
            <div class="flex justify-between border-b pb-2">
              <span>{{ $t('contact.hours.weekdays') }}</span>
              <span class="font-medium">{{ contact.hours.weekdays }}</span>
            </div>
            <div class="flex justify-between border-b pb-2">
              <span>{{ $t('contact.hours.weekends') }}</span>
              <span class="font-medium">{{ contact.hours.weekends }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">{{ $t('contact.form.title') }}</h2>
        
        <!-- Success Message -->
        <div v-if="isSubmitted" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>{{ $t('contact.form.success') }}</p>
        </div>
        
        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{{ errorMessage }}</p>
        </div>
        
        <!-- Form -->
        <form v-if="!isSubmitted" @submit.prevent="submitForm" class="space-y-6">
          <div v-for="field in contact.formFields" :key="field.name" class="space-y-1">
            <label :for="field.name" class="block text-sm font-medium text-gray-700">
              {{ $t(field.label) }} {{ field.required ? '*' : '' }}
            </label>
            
            <!-- Text, Email, Tel inputs -->
            <input 
              v-if="['text', 'email', 'tel'].includes(field.type)" 
              :type="field.type" 
              :id="field.name" 
              v-model="formData[field.name]" 
              :required="field.required"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
            
            <!-- Select input -->
            <select 
              v-else-if="field.type === 'select'" 
              :id="field.name" 
              v-model="formData[field.name]" 
              :required="field.required"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option v-for="option in field.options" :key="option" :value="option">
                {{ $t(option) }}
              </option>
            </select>
            
            <!-- Textarea -->
            <textarea 
              v-else-if="field.type === 'textarea'" 
              :id="field.name" 
              v-model="formData[field.name]" 
              :required="field.required"
              rows="5"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            ></textarea>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>{{ $t('contact.form.submit') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="mt-16">
      <h2 class="text-2xl font-semibold mb-6">{{ $t('contact.mapTitle') }}</h2>
      <div class="rounded-lg overflow-hidden h-96 shadow-lg">
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
            <MapMarker
              :position="[contact.location.lat, contact.location.lng]"
            />
          </LMap>
        </client-only>
      </div>
    </div>
  </div>
  
  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

<style scoped>
:deep(.leaflet-container) {
  z-index: 1;
  font-family: inherit;
}
</style>

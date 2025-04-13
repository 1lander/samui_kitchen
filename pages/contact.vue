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
  } catch (error) {
    errorMessage.value = 'There was an error submitting your message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="contact" class="container mx-auto px-4 py-12">
    <!-- Page Header -->
    <div class="relative h-64 md:h-80 mb-12 rounded-lg overflow-hidden">
      <NuxtImg
        :src="contact.pageHeader.image"
        :alt="$t(contact.pageHeader.title)"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          {{ $t(contact.pageHeader.title) }}
        </h1>
        <p class="text-xl md:text-2xl">{{ $t(contact.pageHeader.subtitle) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Contact Information</h2>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="text-primary mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">Address</h3>
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
              <h3 class="font-medium">Phone</h3>
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
              <h3 class="font-medium">Email</h3>
              <p class="text-gray-600">{{ contact.contactInfo.email }}</p>
            </div>
          </div>
        </div>

        <!-- Opening Hours -->
        <div class="mt-10">
          <h2 class="text-2xl font-semibold mb-6">Opening Hours</h2>
          <div class="space-y-2">
            <div class="flex justify-between border-b pb-2">
              <span>{{ contact.openingHours.weekdays.days }}</span>
              <span class="font-medium">{{ contact.openingHours.weekdays.hours }}</span>
            </div>
            <div class="flex justify-between border-b pb-2">
              <span>{{ contact.openingHours.weekends.days }}</span>
              <span class="font-medium">{{ contact.openingHours.weekends.hours }}</span>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="mt-10">
          <h2 class="text-2xl font-semibold mb-6">Follow Us</h2>
          <div class="flex space-x-4">
            <a v-for="social in contact.contactInfo.social" :key="social.platform" 
               :href="social.url" target="_blank" rel="noopener noreferrer"
               class="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition">
              <span class="sr-only">{{ social.platform }}</span>
              <!-- Icon placeholder -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Send Us a Message</h2>
        
        <!-- Success Message -->
        <div v-if="isSubmitted" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
        
        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{{ errorMessage }}</p>
        </div>
        
        <!-- Form -->
        <form v-if="!isSubmitted" @submit.prevent="submitForm" class="space-y-6">
          <div v-for="field in contact.formFields" :key="field.name" class="space-y-1">
            <label :for="field.name" class="block text-sm font-medium text-gray-700">
              {{ field.label }} {{ field.required ? '*' : '' }}
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
                {{ option }}
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
              <span v-else>{{ contact.submitText }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Map Section (simplified) -->
    <!-- <div class="mt-16">
      <h2 class="text-2xl font-semibold mb-6">Our Location</h2>
      <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <p class="text-gray-600">Map would be displayed here</p>
      </div>
    </div> -->
  </div>
  
  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">Loading content...</p>
  </div>
</template>

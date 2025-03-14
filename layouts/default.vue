<template>
  <div class="min-h-screen flex flex-col bg-amber-50">
    <!-- Header with vibrant Thai-inspired colors -->
    <header class="bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold">Samui Kitchen</h1>
            <p class="ml-4 italic text-white/80">Authentic Thai Flavors</p>
          </div>
          <nav class="hidden md:block">
            <ul class="flex space-x-6">
              <li><NuxtLink to="/" class="hover:text-yellow-200 transition">Home</NuxtLink></li>
              <li><NuxtLink to="/menu" class="hover:text-yellow-200 transition">Menu</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-yellow-200 transition">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-yellow-200 transition">Contact</NuxtLink></li>
              <li><NuxtLink to="/order" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition">Order Now</NuxtLink></li>
            </ul>
          </nav>
          <!-- Mobile menu button -->
          <button class="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-yellow-400">Samui Kitchen</h3>
            <p>Bringing the authentic flavors of Thailand to your doorstep.</p>
            <div class="mt-4 flex space-x-4">
              <a href="#" class="text-white hover:text-yellow-400"><span class="sr-only">Facebook</span>FB</a>
              <a href="#" class="text-white hover:text-yellow-400"><span class="sr-only">Instagram</span>IG</a>
              <a href="#" class="text-white hover:text-yellow-400"><span class="sr-only">Twitter</span>TW</a>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4 text-yellow-400">Opening Hours</h3>
            <ul class="space-y-2">
              <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
              <li>Saturday - Sunday: 12:00 PM - 11:00 PM</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4 text-yellow-400">Contact Us</h3>
            <address class="not-italic">
              <p>123 Thai Street</p>
              <p>Samui District</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@samuikitchen.com</p>
            </address>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {{ new Date().getFullYear() }} Samui Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// You can add any layout-specific logic here
</script>

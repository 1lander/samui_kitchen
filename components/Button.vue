<script setup lang="ts">
  defineProps<{
    variant?: "primary" | "secondary";
    rounded?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
  }>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'flex-1 px-4 py-2 transition-colors',
      fullWidth ? 'w-full' : '',
      rounded ? 'rounded-full' : 'rounded-md',
      variant === 'primary'
        ? 'hover:bg-primary-dark bg-primary text-white hover:bg-primary/80'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    ]"
  >
    <div class="flex items-center justify-center gap-2">
      <div v-if="loading" class="flex items-center justify-center">
        <Icon name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
      </div>
      <slot />
    </div>
  </button>
</template>

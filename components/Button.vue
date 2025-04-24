<script setup lang="ts">
  defineProps<{
    variant?: "primary" | "secondary";
    rounded?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    fullWidth?: boolean;
  }>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'flex-1 px-4 py-2 transition-colors',
      fullWidth ? 'w-full' : '',
      rounded ? 'rounded-full' : 'rounded-md',
      variant === 'primary'
        ? 'hover:bg-primary-dark bg-primary text-white hover:bg-primary/80'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    ]"
  >
    <slot />
  </button>
</template>

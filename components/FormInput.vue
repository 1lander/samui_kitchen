<script setup lang="ts">
const { t } = useI18n();

defineProps<{
  id: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  label: string;
  required?: boolean;
  options?: string[];
  modelValue: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }} {{ required ? "*" : "" }}
    </label>

    <input
      v-if="['text', 'email', 'tel'].includes(type)"
      :id="id"
      :type="type"
      :required="required"
      class="block w-full rounded-md border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <select
      v-else-if="type === 'select'"
      :id="id"
      :required="required"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ t(option) }}
      </option>
    </select>

    <textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :required="required"
      rows="3"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  </div>
</template> 
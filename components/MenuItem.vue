<script setup lang="ts">
  import type { MenuItem } from "~/types";
  const { t } = useI18n();

  const props = defineProps<{
    item: MenuItem;
  }>();

  const emit = defineEmits<{
    click: [item: MenuItem];
  }>();

  const handleClick = () => {
    emit("click", props.item);
  };
</script>

<template>
  <div
    @click="handleClick"
    class="cursor-pointer border border-gray-200 p-4 transition-shadow hover:shadow-md md:rounded-lg"
  >
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <div class="text-xl font-semibold">{{ t(item.name) }}</div>
        <div class="text-l font-semibold text-gray-500" v-if="item.dishChoices && item.dishChoices.length > 0">
          (<span v-for="(choice, choiceIndex) in item.dishChoices" :key="choiceIndex">{{ t(`menu.dishChoices.${choice}`) }}<template v-if="choiceIndex < item.dishChoices.length - 1">, </template></span>)
        </div>
      </div>
      <div class="text-right">
        <span class="text-lg font-medium text-secondary">€ {{ item.price.toFixed(2) }}</span>
      </div>
    </div>
    <p v-if="item.description" class="mt-1 text-secondary">
      {{ t(item.description) }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { formatPrice } from "~/helpers";
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

  const formattedDishChoices = computed(() => {
    if (!props.item.dishChoices?.length) return "";
    return "(" + props.item.dishChoices.map((choice) => t(`menu.dishChoices.${choice}`)).join(", ") + ")";
  });
</script>

<template>
  <div
    class="cursor-pointer border border-gray-200 p-4 transition-shadow hover:shadow-md md:rounded-lg"
    @click="handleClick"
  >
    <div class="flex items-start justify-between">
      <div>
        <div class="flex flex-wrap items-center">
          <div class="mr-2 text-xl font-semibold">{{ t(item.name) }}</div>
          <div v-if="item.dishChoices && item.dishChoices.length > 0" class="text-l font-semibold text-gray-500">
            {{ formattedDishChoices }}
          </div>
        </div>
      </div>
      <div class="whitespace-nowrap text-right">
        <span class="text-lg font-medium text-secondary">{{ formatPrice(item.price) }}</span>
      </div>
    </div>
    <p v-if="item.description" class="mt-1 text-secondary">
      {{ t(item.description) }}
    </p>
  </div>
</template>

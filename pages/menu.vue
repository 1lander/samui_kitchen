<script setup>
const { data: menuData } = await useAsyncData(() =>
  queryCollection("content").path("/menu").first()
);

const menu = computed(() => menuData.value?.body);

const { t } = useI18n();

useSeoMeta({
  title: t('menu.pageTitle') + " - Samui Kitchen",
  description: t('menu.description'),
});
</script>

<template>
  <div v-if="menu" class="container mx-auto px-4 py-12">
    <PageHeader
      :image="menu.pageHeader.image"
      :title="$t('menu.pageTitle')"
      :subtitle="$t('menu.pageSubtitle')"
    />

    <div class="max-w-3xl mx-auto mb-12 text-center">
      <p class="text-lg text-gray-700">{{ $t('menu.description') }}</p>
    </div>

    <div class="max-w-5xl mx-auto">
      <div
        v-for="(category, index) in menu.categories"
        :key="index"
        class="mb-12"
      >
        <h2
          class="text-3xl font-bold mb-6 text-center border-b-2 border-secondary pb-2"
        >
          {{ $t(category.name) }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold">
                {{ $t(item.name) }}
                <span v-if="item.dishChoices && item.dishChoices.length > 0" class="text-sm text-gray-600 block mt-1">
                  {{ $t('menu.dishChoices.choice') }}: 
                  <span v-for="(choice, choiceIndex) in item.dishChoices" :key="choiceIndex" class="mr-1">
                    {{ $t(`menu.dishChoices.${choice}`) }}
                    <template v-if="choiceIndex < item.dishChoices.length - 1">/</template>
                  </span>
                </span>
              </h3>
              <div class="text-right">
                <span class="text-lg font-medium text-secondary">
                  € {{ item.price.toFixed(2) }}
                </span>
                <span v-if="item.secondPrice" class="text-lg font-medium text-secondary ml-1">
                  / € {{ item.secondPrice.toFixed(2) }}
                </span>
              </div>
            </div>
            <p v-if="item.description" class="text-secondary mt-1">
              {{ $t(item.description) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-12 text-center">
    <p class="text-lg text-gray-600">{{ $t('menu.loading') }}</p>
  </div>
</template>

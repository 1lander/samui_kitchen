<!-- TODO: This is AI generated, so it needs to be cleaned up and optimized -->
<script setup lang="ts">
  interface PaymentStatusResponse {
    id: string;
    status: string;
    amount: {
      value: string;
      currency: string;
    };
    method?: string;
  }

  const route = useRoute();
  const { t } = useI18n();
  const paymentStatus = ref("");
  const isLoading = ref(true);
  const statusMessage = ref("");
  const orderStore = useOrderStore();

  onMounted(async () => {
    try {
      // Check for payment ID in the URL (Mollie redirects back with payment ID)
      const paymentId = route.query.id;

      if (paymentId) {
        // Fetch payment status from your backend
        const response = await $fetch<PaymentStatusResponse>(`/api/payment-status?id=${paymentId}`);
        paymentStatus.value = response.status;

        // Set appropriate message based on status
        if (response.status === "paid") {
          statusMessage.value = t("order.paymentSuccess");
          // Clear the cart after successful payment
          orderStore.clearOrder();
        } else if (response.status === "open") {
          statusMessage.value = t("order.paymentPending");
        } else if (response.status === "failed" || response.status === "canceled") {
          statusMessage.value = t("order.paymentFailed");
        } else {
          statusMessage.value = t("order.paymentUnknown");
        }
      } else {
        // No payment ID in URL
        paymentStatus.value = "unknown";
        statusMessage.value = t("order.paymentCheckoutIncomplete");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      paymentStatus.value = "error";
      statusMessage.value = t("order.paymentStatusError");
    } finally {
      isLoading.value = false;
    }
  });

  // SEO
  useSeoMeta({
    title: t("order.confirmationTitle") + " - Samui Kitchen",
    description: t("order.confirmationDescription")
  });
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12">
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-3xl font-bold">{{ t("order.confirmationTitle") }}</h1>
      <p class="text-gray-600">{{ t("order.confirmationDescription") }}</p>
    </div>

    <div class="rounded-lg bg-white p-8 text-center shadow">
      <div v-if="isLoading" class="py-8">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600">{{ t("order.checkingStatus") }}</p>
      </div>

      <div v-else>
        <!-- Success -->
        <div v-if="paymentStatus === 'paid'" class="py-6">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="mb-2 text-2xl font-semibold text-gray-800">{{ t("order.thankYou") }}</h2>
          <p class="mb-6 text-gray-600">{{ statusMessage }}</p>
          <NuxtLink
            to="/"
            class="hover:bg-primary-dark inline-block rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors"
          >
            {{ t("order.backToHome") }}
          </NuxtLink>
        </div>

        <!-- Pending -->
        <div v-else-if="paymentStatus === 'open'" class="py-6">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 class="mb-2 text-2xl font-semibold text-gray-800">{{ t("order.processing") }}</h2>
          <p class="mb-6 text-gray-600">{{ statusMessage }}</p>
          <NuxtLink
            to="/order"
            class="inline-block rounded-md bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300"
          >
            {{ t("order.backToOrder") }}
          </NuxtLink>
        </div>

        <!-- Failed -->
        <div v-else class="py-6">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 class="mb-2 text-2xl font-semibold text-gray-800">{{ t("order.paymentIssue") }}</h2>
          <p class="mb-6 text-gray-600">{{ statusMessage }}</p>
          <NuxtLink
            to="/order"
            class="hover:bg-primary-dark inline-block rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors"
          >
            {{ t("order.tryAgain") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

import { createMollieClient } from "@mollie/api-client";
import type { Order } from "~/types/order.types";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || ""
  });

  try {
    const body = await readBody<Order>(event);
    const payment = await mollieClient.payments.create({
      amount: {
        value: body.total.toString(),
        currency: "EUR"
      },
      description: "Samui Kitchen Order",
      redirectUrl: `${config.public.siteUrl}/order-confirmation`,
      webhookUrl: `${config.public.siteUrl}/api/payment-webhook`
    });

    return payment;
  } catch (error: any) {
    console.error("Payment creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Payment processing failed"
    });
  }
});

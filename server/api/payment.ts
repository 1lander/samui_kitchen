import createMollieClient from "@mollie/api-client";
import type { Order } from "~/types/order.types";

export default defineEventHandler(async (event) => {
  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || ""
  });

  const body = await readBody<Order>(event);
  const payment = await mollieClient.payments.create({
    amount: {
      value: body.total.toString(),
      currency: "EUR"
    },
    description: "My first API payment",
    redirectUrl: "https://yourwebshop.example.org/order/123456",
    webhookUrl: "https://yourwebshop.example.org/webhook"
  });

  return payment;
});

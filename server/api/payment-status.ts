// TODO: This is AI generated, so it needs to be cleaned up and optimized
import { createMollieClient } from "@mollie/api-client";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const paymentId = query.id as string;

  if (!paymentId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing payment ID"
    });
  }

  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || ""
  });

  try {
    const payment = await mollieClient.payments.get(paymentId);

    return {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      method: payment.method
    };
  } catch (error: any) {
    console.error("Error fetching payment status:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to fetch payment status"
    });
  }
});

// TODO: This is AI generated, so it needs to be cleaned up and optimized
import { createMollieClient } from "@mollie/api-client";

export default defineEventHandler(async (event) => {
  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || ""
  });

  try {
    const body = await readBody(event);

    // Mollie will send the payment ID in the form data
    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing payment ID"
      });
    }

    // Fetch the payment to get its current status
    const payment = await mollieClient.payments.get(body.id);

    // Log the status update
    console.log(`Payment ${payment.id} status: ${payment.status}`);

    // Process payment status change
    // Here you could update the order status in your database
    // Based on payment.status (paid, failed, canceled, etc.)

    // Return a 200 response to Mollie to acknowledge receipt
    return {
      received: true,
      paymentId: payment.id,
      status: payment.status
    };
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Webhook processing failed"
    });
  }
});

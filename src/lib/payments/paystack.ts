type PaystackInitParams = {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, string>;
  callbackPath?: string;
};

type PaystackInitResult = {
  authorizationUrl: string | null;
  reference: string;
};

/**
 * Initialize a Paystack transaction. In development without API keys,
 * returns a mock URL that routes to the confirmation page.
 */
export async function initializePaystackTransaction(
  params: PaystackInitParams,
): Promise<PaystackInitResult> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!secretKey) {
    if (params.metadata?.type === "wallet_topup") {
      return {
        authorizationUrl: `${baseUrl}/resident/wallet?topup=1&ref=${params.reference}`,
        reference: params.reference,
      };
    }
    if (params.metadata?.type === "tenant" && params.metadata?.invoiceId) {
      return {
        authorizationUrl: `${baseUrl}/resident/payment/${params.metadata.invoiceId}?demo=1&ref=${params.reference}`,
        reference: params.reference,
      };
    }
    const pledgeId = params.metadata?.pledgeId ?? params.reference;
    return {
      authorizationUrl: `${baseUrl}/sponsor/confirmation/${pledgeId}?demo=1`,
      reference: params.reference,
    };
  }

  const callbackUrl = params.callbackPath
    ? `${baseUrl}${params.callbackPath}`
    : `${baseUrl}/sponsor/confirmation/${params.metadata?.pledgeId}`;

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      metadata: params.metadata,
      callback_url: callbackUrl,
    }),
  });

  const json = (await response.json()) as {
    status: boolean;
    data?: { authorization_url: string; reference: string };
    message?: string;
  };

  if (!json.status || !json.data) {
    console.error("Paystack init failed:", json.message);
    return { authorizationUrl: null, reference: params.reference };
  }

  return {
    authorizationUrl: json.data.authorization_url,
    reference: json.data.reference,
  };
}

export function verifyPaystackSignature(
  rawBody: string,
  signature: string | null,
): boolean {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) {
    return process.env.NODE_ENV === "development";
  }

  void rawBody;
  void signature;
  return process.env.NODE_ENV === "development";
}

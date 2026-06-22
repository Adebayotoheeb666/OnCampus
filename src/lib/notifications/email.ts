type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[email dev]", params.to, params.subject, params.html.slice(0, 200));
    return true;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "OnCampus <noreply@oncampus.ng>",
      to: params.to,
      subject: params.subject,
      html: params.html,
    }),
  });

  if (!response.ok) {
    console.error("Resend error:", await response.text());
    return false;
  }

  return true;
}

export async function sendOtpEmail(email: string, code: string) {
  return sendEmail({
    to: email,
    subject: "Your OnCampus sign-in code",
    html: `
      <p>Your one-time sign-in code is:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:4px">${code}</p>
      <p>This code expires in 10 minutes. If you did not request this, you can ignore this email.</p>
    `,
  });
}

export async function sendCertificateEmail(email: string, sponsorName: string, certificateUrl: string) {
  return sendEmail({
    to: email,
    subject: "Your Sponsor a Bed certificate — OnCampus",
    html: `
      <p>Dear ${sponsorName},</p>
      <p>Thank you for your sponsorship through OnCampus. Your digital certificate is ready.</p>
      <p><a href="${certificateUrl}">Download your certificate</a></p>
      <p>With gratitude,<br/>The OnCampus Team · FUTA</p>
    `,
  });
}

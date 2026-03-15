// Supabase Edge Function
// Receives a webhook payload on INSERT into `vehicle_inquiries`
// and sends an email notification via Resend.

type WebhookRecord = {
  record?: {
    id?: string;
    created_at?: string;
    vehicle?: string;
    name?: string;
    email?: string | null;
    phone?: string | null;
    message?: string;
    source?: string | null;
  };
};

function clean(input: unknown) {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim();
}

function formatLine(label: string, value: string) {
  return value ? `${label}: ${value}` : "";
}

Deno.serve(async (req) => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
  const NOTIFY_TO_EMAIL = Deno.env.get("NOTIFY_TO_EMAIL") ?? "";
  const NOTIFY_FROM_EMAIL = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "onboarding@resend.dev";

  if (!RESEND_API_KEY || !NOTIFY_TO_EMAIL) {
    return new Response(
      JSON.stringify({
        error: "Missing RESEND_API_KEY or NOTIFY_TO_EMAIL function secrets.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const payload = (await req.json()) as WebhookRecord;
  const r = payload.record ?? {};

  const vehicle = clean(r.vehicle);
  const name = clean(r.name);
  const email = clean(r.email);
  const phone = clean(r.phone);
  const message = clean(r.message);
  const createdAt = clean(r.created_at);
  const source = clean(r.source);

  const subject = vehicle
    ? `New vehicle inquiry: ${vehicle}`
    : "New vehicle inquiry";

  const lines = [
    formatLine("Vehicle", vehicle),
    formatLine("Name", name),
    formatLine("Phone", phone),
    formatLine("Email", email),
    formatLine("Source", source),
    formatLine("Created", createdAt),
    "",
    message ? `Message:\n${message}` : "",
  ].filter(Boolean);

  const emailBody = lines.join("\n");

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_FROM_EMAIL,
      to: [NOTIFY_TO_EMAIL],
      subject,
      text: emailBody,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: errText }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});


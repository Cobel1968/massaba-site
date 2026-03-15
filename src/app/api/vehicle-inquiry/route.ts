import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type Payload = {
  vehicle?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
};

function clean(input: unknown) {
  if (typeof input !== "string") return "";
  return input.replaceAll(/\s+/g, " ").trim();
}

export async function POST(req: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Server is not configured yet (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
      },
      { status: 500 },
    );
  }

  const body = (await req.json()) as Payload;
  const vehicle = clean(body.vehicle);
  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message);
  const source = clean(body.source) || "vehicle_gallery";

  if (!name || !message || !vehicle) {
    return NextResponse.json(
      { error: "Missing required fields (vehicle, name, message)." },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("vehicle_inquiries").insert([
    {
      vehicle,
      name,
      email: email || null,
      phone: phone || null,
      message,
      source,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Inquiry sent successfully.",
  });
}


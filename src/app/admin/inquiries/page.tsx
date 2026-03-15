import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type InquiryRow = {
  id: string;
  created_at: string;
  vehicle: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  source: string | null;
};

export default async function AdminInquiriesPage() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-slate-100 lg:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin – Vehicle inquiries
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Server is not configured yet. Set{" "}
          <span className="font-medium text-slate-200">SUPABASE_URL</span> and{" "}
          <span className="font-medium text-slate-200">
            SUPABASE_SERVICE_ROLE_KEY
          </span>{" "}
          in your environment variables.
        </p>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("vehicle_inquiries")
    .select(
      "id, created_at, vehicle, name, email, phone, message, source",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Vehicle inquiries
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Latest submissions from the vehicle gallery forms.
            </p>
          </div>
          <Link
            href="/services/vehicle-import-export"
            className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-100 transition hover:border-sky-500/70"
          >
            Back to vehicles
          </Link>
        </div>

        {error ? (
          <div className="mt-8 rounded-2xl border border-rose-900/60 bg-rose-950/30 p-5 text-sm text-rose-200">
            Failed to load inquiries: {error.message}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
            <div className="grid grid-cols-[140px_1.1fr_0.9fr_1fr] gap-3 border-b border-slate-800 bg-slate-950/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              <div>Date</div>
              <div>Vehicle</div>
              <div>Client</div>
              <div>Message</div>
            </div>
            <div className="divide-y divide-slate-900">
              {(data as InquiryRow[] | null)?.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[140px_1.1fr_0.9fr_1fr] gap-3 px-4 py-4 text-sm"
                >
                  <div className="text-xs text-slate-400">
                    {new Date(row.created_at).toLocaleString()}
                  </div>
                  <div className="text-slate-200">{row.vehicle}</div>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="text-slate-100">{row.name}</div>
                    {row.phone ? <div>{row.phone}</div> : null}
                    {row.email ? <div>{row.email}</div> : null}
                    {row.source ? (
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        {row.source}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-slate-300">{row.message}</div>
                </div>
              ))}
              {(data as InquiryRow[] | null)?.length === 0 ? (
                <div className="px-4 py-6 text-sm text-slate-400">
                  No inquiries yet.
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


"use client";

import { useMemo, useState } from "react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

function safeTrim(value: string) {
  return value.replaceAll(/\s+/g, " ").trim();
}

function idSafe(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

export default function VehicleInquiryForm({
  vehicleLabel,
}: Readonly<{ vehicleLabel: string }>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const vehicle = useMemo(() => safeTrim(vehicleLabel), [vehicleLabel]);
  const idBase = useMemo(() => idSafe(vehicle) || "vehicle", [vehicle]);

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (status.state === "submitting") return;

    const payload = {
      vehicle,
      name: safeTrim(name),
      email: safeTrim(email),
      phone: safeTrim(phone),
      message: safeTrim(message),
      source: "vehicle_gallery",
    };

    if (!payload.name || !payload.message) {
      setStatus({
        state: "error",
        message: "Please add your name and a short message.",
      });
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/vehicle-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setStatus({
          state: "error",
          message: json.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setStatus({
        state: "success",
        message: json.message || "Inquiry sent. We’ll contact you shortly.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 space-y-3 text-xs"
      suppressHydrationWarning
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Inquiry for
        </p>
        <p className="mt-1 text-sm text-slate-200">{vehicle}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label
            htmlFor={`vehicle-name-${idBase}`}
            className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            Name
          </label>
          <input
            id={`vehicle-name-${idBase}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            suppressHydrationWarning
            className="w-full rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor={`vehicle-phone-${idBase}`}
            className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400"
          >
            Phone
          </label>
          <input
            id={`vehicle-phone-${idBase}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            suppressHydrationWarning
            className="w-full rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400"
            placeholder="+00 000 000 0000"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`vehicle-email-${idBase}`}
          className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400"
        >
          Email (optional)
        </label>
        <input
          id={`vehicle-email-${idBase}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          suppressHydrationWarning
          className="w-full rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label
          htmlFor={`vehicle-message-${idBase}`}
          className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400"
        >
          Message
        </label>
        <textarea
          id={`vehicle-message-${idBase}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          suppressHydrationWarning
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400"
          placeholder="Tell us what you need (budget, destination, quantity, timeline)."
        />
      </div>

      <button
        type="submit"
        disabled={status.state === "submitting"}
        suppressHydrationWarning
        className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.state === "submitting" ? "Sending..." : "Send inquiry"}
      </button>

      {status.state === "success" ? (
        <p className="text-[11px] text-emerald-300">{status.message}</p>
      ) : null}
      {status.state === "error" ? (
        <p className="text-[11px] text-rose-300">{status.message}</p>
      ) : null}

      <p className="text-[10px] text-slate-500">
        This sends your inquiry to our team. We’ll respond via phone/WhatsApp or
        email.
      </p>
    </form>
  );
}


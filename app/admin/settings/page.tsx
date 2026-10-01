"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [propertyName, setPropertyName] = useState("Mira Hotel");
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [checkIn, setCheckIn] = useState("15:00");
  const [checkOut, setCheckOut] = useState("11:00");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [arrivalAlerts, setArrivalAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  const inputClass =
    "mt-1.5 h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

  const cardClass =
    "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Property preferences and profile — UI only, nothing is persisted to a
          server.
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-8">
        <section className={cardClass}>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Profile
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Name</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {user?.name ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Email</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {user?.email ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Role</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {user?.title ?? "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className={cardClass}>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Property
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Property name
              </span>
              <input
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Timezone
              </span>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={inputClass}
              >
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Europe/Paris">Europe/Paris</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Appearance
              </span>
              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value === "dark" ? "dark" : "light")
                }
                className={inputClass}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Check-in
              </span>
              <input
                type="time"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Check-out
              </span>
              <input
                type="time"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Notifications
          </h2>
          <div className="mt-4 space-y-3">
            <Toggle
              label="Email digests"
              description="Daily summary of arrivals and open requests."
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
            <Toggle
              label="Arrival alerts"
              description="Ping the desk when a guest is due within two hours."
              checked={arrivalAlerts}
              onChange={setArrivalAlerts}
            />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Save changes
          </button>
          {saved ? (
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              Saved (demo)
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-zinc-500">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked
            ? "bg-zinc-900 dark:bg-zinc-100"
            : "bg-zinc-200 dark:bg-zinc-700"
          }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform dark:bg-zinc-950 ${checked ? "translate-x-5" : "translate-x-0"
            }`}
        />
      </button>
    </label>
  );
}
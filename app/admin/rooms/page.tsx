"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HousekeepingBadge,
  InventoryBadge,
} from "@/components/admin/status-badge";
import { TableToolbar } from "@/components/admin/table-toolbar";
import { EmptyState } from "@/components/shared/empty-state";
import { Modal } from "@/components/shared/modal";
import { Tabs } from "@/components/shared/tabs";
import {
  formatShortDate,
  roomUnits as seedUnits,
  type HousekeepingStatus,
  type RoomInventoryStatus,
  type RoomUnit,
} from "@/lib/data/operations";
import {
  rooms as seedCatalog,
  type GalleryShot,
  type Room,
  type RoomCategory,
} from "@/lib/data/rooms";
import { useClientTable } from "@/lib/use-client-table";

const UNITS_KEY = "mira-hotel-admin-units";
const CATALOG_KEY = "mira-hotel-admin-catalog";

type Tab = "units" | "types";

type UnitForm = {
  number: string;
  roomSlug: string;
  floor: string;
  inventory: RoomInventoryStatus;
  housekeeping: HousekeepingStatus;
  currentGuest: string;
  nextArrival: string;
};

type TypeForm = {
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  priceFrom: string;
  guests: string;
  sizeSqm: string;
  beds: string;
  highlight: string;
  featured: boolean;
  gallery: GalleryShot[];
};

const TABS = [
  { id: "units" as const, label: "Units" },
  { id: "types" as const, label: "Room types" },
];

const unitFilterOptions = [
  { value: "all", label: "All units" },
  { value: "inv:available", label: "Available" },
  { value: "inv:occupied", label: "Occupied" },
  { value: "inv:out-of-service", label: "Out of service" },
  { value: "hk:dirty", label: "Dirty" },
  { value: "hk:in-progress", label: "HK in progress" },
  { value: "hk:clean", label: "Clean" },
];

const inputClass =
  "mt-1.5 h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

const btnPrimary =
  "rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white";
const btnGhost =
  "rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";

function emptyUnitForm(catalog: Room[]): UnitForm {
  return {
    number: "",
    roomSlug: catalog[0]?.slug ?? "courtyard-queen",
    floor: "2",
    inventory: "available",
    housekeeping: "clean",
    currentGuest: "",
    nextArrival: "",
  };
}

function loadUnits(): RoomUnit[] {
  if (typeof window === "undefined") return seedUnits;
  try {
    const raw = localStorage.getItem(UNITS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as RoomUnit[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore */
  }
  return seedUnits.map((u) => ({ ...u }));
}

function loadCatalog(): Room[] {
  if (typeof window === "undefined") return seedCatalog;
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Room[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore */
  }
  return seedCatalog.map((r) => ({
    ...r,
    gallery: r.gallery.map((g) => ({ ...g })),
    amenities: [...r.amenities],
  }));
}

function persistUnits(units: RoomUnit[]) {
  try {
    localStorage.setItem(UNITS_KEY, JSON.stringify(units));
  } catch {
    /* ignore */
  }
}

function persistCatalog(catalog: Room[]) {
  try {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(catalog));
  } catch {
    /* ignore */
  }
}

export default function AdminRoomsPage() {
  const [tab, setTab] = useState<Tab>("units");
  const [units, setUnits] = useState<RoomUnit[]>(seedUnits);
  const [catalog, setCatalog] = useState<Room[]>(seedCatalog);
  const [ready, setReady] = useState(false);

  const [unitModal, setUnitModal] = useState<"create" | "edit" | null>(null);
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [unitForm, setUnitForm] = useState<UnitForm>(emptyUnitForm(seedCatalog));
  const [unitError, setUnitError] = useState("");
  const [deleteUnitId, setDeleteUnitId] = useState<string | null>(null);

  const [typeForm, setTypeForm] = useState<TypeForm | null>(null);
  const [typeError, setTypeError] = useState("");

  useEffect(() => {
    setUnits(loadUnits());
    setCatalog(loadCatalog());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) persistUnits(units);
  }, [units, ready]);

  useEffect(() => {
    if (ready) persistCatalog(catalog);
  }, [catalog, ready]);

  const sortedUnits = useMemo(
    () =>
      [...units].sort((a, b) =>
        a.number.localeCompare(b.number, undefined, { numeric: true }),
      ),
    [units],
  );

  const counts = useMemo(
    () => ({
      available: units.filter((u) => u.inventory === "available").length,
      occupied: units.filter((u) => u.inventory === "occupied").length,
      dirty: units.filter((u) => u.housekeeping === "dirty").length,
      oos: units.filter((u) => u.inventory === "out-of-service").length,
    }),
    [units],
  );

  const unitSearchFn = useCallback((row: RoomUnit, q: string) => {
    return (
      row.number.includes(q) ||
      row.roomName.toLowerCase().includes(q) ||
      (row.currentGuest?.toLowerCase().includes(q) ?? false)
    );
  }, []);

  const unitFilterFn = useCallback((row: RoomUnit, filter: string) => {
    if (filter.startsWith("inv:")) {
      return row.inventory === (filter.slice(4) as RoomInventoryStatus);
    }
    if (filter.startsWith("hk:")) {
      return row.housekeeping === (filter.slice(3) as HousekeepingStatus);
    }
    return true;
  }, []);

  const unitTable = useClientTable({
    data: sortedUnits,
    pageSize: 8,
    searchFn: unitSearchFn,
    filterFn: unitFilterFn,
  });

  function openCreateUnit() {
    setUnitForm(emptyUnitForm(catalog));
    setUnitError("");
    setEditingUnitId(null);
    setUnitModal("create");
  }

  function openEditUnit(u: RoomUnit) {
    setUnitForm({
      number: u.number,
      roomSlug: u.roomSlug,
      floor: String(u.floor),
      inventory: u.inventory,
      housekeeping: u.housekeeping,
      currentGuest: u.currentGuest ?? "",
      nextArrival: u.nextArrival ?? "",
    });
    setUnitError("");
    setEditingUnitId(u.id);
    setUnitModal("edit");
  }

  function submitUnit(e: React.FormEvent) {
    e.preventDefault();
    const number = unitForm.number.trim();
    if (!number) {
      setUnitError("Unit number is required.");
      return;
    }
    const floor = Number(unitForm.floor);
    if (!Number.isFinite(floor) || floor < 0) {
      setUnitError("Floor must be a valid number.");
      return;
    }
    const type = catalog.find((r) => r.slug === unitForm.roomSlug);
    if (!type) {
      setUnitError("Choose a room type.");
      return;
    }
    if (units.some((u) => u.number === number && u.id !== editingUnitId)) {
      setUnitError(`Unit #${number} already exists.`);
      return;
    }

    const payload: RoomUnit = {
      id: editingUnitId ?? `u-${Date.now()}`,
      number,
      roomSlug: type.slug,
      roomName: type.name,
      floor,
      inventory: unitForm.inventory,
      housekeeping: unitForm.housekeeping,
      currentGuest: unitForm.currentGuest.trim() || undefined,
      nextArrival: unitForm.nextArrival || undefined,
    };

    setUnits((prev) =>
      editingUnitId
        ? prev.map((u) => (u.id === editingUnitId ? payload : u))
        : [...prev, payload],
    );
    setUnitModal(null);
  }

  function openEditType(room: Room) {
    setTypeForm({
      slug: room.slug,
      name: room.name,
      category: room.category,
      tagline: room.tagline,
      priceFrom: String(room.priceFrom),
      guests: String(room.guests),
      sizeSqm: String(room.sizeSqm),
      beds: room.beds,
      highlight: room.highlight,
      featured: room.featured,
      gallery: room.gallery.map((g) => ({ ...g })),
    });
    setTypeError("");
  }

  function updateGalleryShot(
    index: number,
    field: keyof GalleryShot,
    value: string,
  ) {
    setTypeForm((f) => {
      if (!f) return f;
      return {
        ...f,
        gallery: f.gallery.map((g, i) =>
          i === index ? { ...g, [field]: value } : g,
        ),
      };
    });
  }

  function addGalleryShot() {
    setTypeForm((f) => {
      if (!f) return f;
      return {
        ...f,
        gallery: [
          ...f.gallery,
          {
            src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
            label: "New photo",
            alt: `${f.name} — new photo`,
          },
        ],
      };
    });
  }

  function removeGalleryShot(index: number) {
    setTypeForm((f) => {
      if (!f || f.gallery.length <= 1) return f;
      return { ...f, gallery: f.gallery.filter((_, i) => i !== index) };
    });
  }

  function submitType(e: React.FormEvent) {
    e.preventDefault();
    if (!typeForm) return;
    const name = typeForm.name.trim();
    if (!name) {
      setTypeError("Name is required.");
      return;
    }
    const priceFrom = Number(typeForm.priceFrom);
    if (!Number.isFinite(priceFrom) || priceFrom < 0) {
      setTypeError("Price must be a valid number.");
      return;
    }
    if (!typeForm.gallery.length) {
      setTypeError("Add at least one gallery image.");
      return;
    }
    for (const g of typeForm.gallery) {
      if (!g.src.trim() || !g.label.trim()) {
        setTypeError("Each gallery shot needs a label and image URL.");
        return;
      }
    }

    const guests = Number(typeForm.guests);
    const sizeSqm = Number(typeForm.sizeSqm);

    setCatalog((prev) =>
      prev.map((r) => {
        if (r.slug !== typeForm.slug) return r;
        const gallery = typeForm.gallery.map((g) => ({
          src: g.src.trim(),
          label: g.label.trim(),
          alt: g.alt.trim() || `${name} — ${g.label.trim()}`,
        }));
        return {
          ...r,
          name,
          category: typeForm.category,
          tagline: typeForm.tagline.trim(),
          priceFrom,
          guests: Number.isFinite(guests) ? guests : r.guests,
          sizeSqm: Number.isFinite(sizeSqm) ? sizeSqm : r.sizeSqm,
          beds: typeForm.beds.trim() || r.beds,
          highlight: typeForm.highlight.trim() || r.highlight,
          featured: typeForm.featured,
          image: gallery[0].src,
          imageAlt: gallery[0].alt,
          gallery,
        };
      }),
    );
    setTypeForm(null);
  }

  function resetAll() {
    const nextUnits = seedUnits.map((u) => ({ ...u }));
    const nextCatalog = seedCatalog.map((r) => ({
      ...r,
      gallery: r.gallery.map((g) => ({ ...g })),
      amenities: [...r.amenities],
    }));
    setUnits(nextUnits);
    setCatalog(nextCatalog);
    persistUnits(nextUnits);
    persistCatalog(nextCatalog);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
            Rooms
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Units (inventory) and types (gallery & rates) — demo data in this
            browser only.
          </p>
        </div>
        <button type="button" onClick={resetAll} className={btnGhost + " text-xs"}>
          Reset demo data
        </button>
      </div>

      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-6" />

      {tab === "units" ? (
        <UnitsPanel
          counts={counts}
          unitTable={unitTable}
          onAdd={openCreateUnit}
          onEdit={openEditUnit}
          onDelete={setDeleteUnitId}
        />
      ) : (
        <TypesPanel catalog={catalog} onEdit={openEditType} />
      )}

      <Modal
        open={unitModal !== null}
        onClose={() => setUnitModal(null)}
        title={unitModal === "create" ? "Add unit" : "Edit unit"}
        description="Physical key — inventory & housekeeping. Gallery is under Room types."
      >
        <form onSubmit={submitUnit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Unit number">
              <input
                value={unitForm.number}
                onChange={(e) =>
                  setUnitForm((f) => ({ ...f, number: e.target.value }))
                }
                className={inputClass}
                placeholder="412"
              />
            </Field>
            <Field label="Floor">
              <input
                type="number"
                min={0}
                value={unitForm.floor}
                onChange={(e) =>
                  setUnitForm((f) => ({ ...f, floor: e.target.value }))
                }
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Room type">
            <select
              value={unitForm.roomSlug}
              onChange={(e) =>
                setUnitForm((f) => ({ ...f, roomSlug: e.target.value }))
              }
              className={inputClass}
            >
              {catalog.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Inventory">
              <select
                value={unitForm.inventory}
                onChange={(e) =>
                  setUnitForm((f) => ({
                    ...f,
                    inventory: e.target.value as RoomInventoryStatus,
                  }))
                }
                className={inputClass}
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="out-of-service">Out of service</option>
              </select>
            </Field>
            <Field label="Housekeeping">
              <select
                value={unitForm.housekeeping}
                onChange={(e) =>
                  setUnitForm((f) => ({
                    ...f,
                    housekeeping: e.target.value as HousekeepingStatus,
                  }))
                }
                className={inputClass}
              >
                <option value="clean">Clean</option>
                <option value="dirty">Dirty</option>
                <option value="in-progress">In progress</option>
                <option value="inspected">Inspected</option>
              </select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Current guest">
              <input
                value={unitForm.currentGuest}
                onChange={(e) =>
                  setUnitForm((f) => ({ ...f, currentGuest: e.target.value }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Next arrival">
              <input
                type="date"
                value={unitForm.nextArrival}
                onChange={(e) =>
                  setUnitForm((f) => ({ ...f, nextArrival: e.target.value }))
                }
                className={inputClass}
              />
            </Field>
          </div>
          {unitError ? (
            <p className="text-sm text-red-600 dark:text-red-400">{unitError}</p>
          ) : null}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setUnitModal(null)} className={btnGhost}>
              Cancel
            </button>
            <button type="submit" className={btnPrimary}>
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={typeForm !== null}
        onClose={() => setTypeForm(null)}
        title="Edit type & gallery"
        description={typeForm?.slug}
        size="lg"
        scrollBody
      >
        {typeForm ? (
          <form onSubmit={submitType} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" className="sm:col-span-2">
                <input
                  value={typeForm.name}
                  onChange={(e) =>
                    setTypeForm((f) => (f ? { ...f, name: e.target.value } : f))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Category">
                <select
                  value={typeForm.category}
                  onChange={(e) =>
                    setTypeForm((f) =>
                      f
                        ? { ...f, category: e.target.value as RoomCategory }
                        : f,
                    )
                  }
                  className={inputClass}
                >
                  <option value="standard">Standard</option>
                  <option value="family">Family</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="vip">VIP</option>
                </select>
              </Field>
              <Field label="Price from">
                <input
                  type="number"
                  min={0}
                  value={typeForm.priceFrom}
                  onChange={(e) =>
                    setTypeForm((f) =>
                      f ? { ...f, priceFrom: e.target.value } : f,
                    )
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Tagline" className="sm:col-span-2">
                <input
                  value={typeForm.tagline}
                  onChange={(e) =>
                    setTypeForm((f) =>
                      f ? { ...f, tagline: e.target.value } : f,
                    )
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Beds">
                <input
                  value={typeForm.beds}
                  onChange={(e) =>
                    setTypeForm((f) => (f ? { ...f, beds: e.target.value } : f))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Guests">
                <input
                  type="number"
                  min={1}
                  value={typeForm.guests}
                  onChange={(e) =>
                    setTypeForm((f) =>
                      f ? { ...f, guests: e.target.value } : f,
                    )
                  }
                  className={inputClass}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={typeForm.featured}
                  onChange={(e) =>
                    setTypeForm((f) =>
                      f ? { ...f, featured: e.target.checked } : f,
                    )
                  }
                  className="size-4 rounded border-zinc-300"
                />
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  Featured on homepage
                </span>
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Gallery
                </h3>
                <button
                  type="button"
                  onClick={addGalleryShot}
                  className="text-xs font-medium text-zinc-700 hover:underline dark:text-zinc-300"
                >
                  + Add photo
                </button>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                First image is the primary on cards and the hero.
              </p>
              <ul className="mt-3 space-y-3">
                {typeForm.gallery.map((shot, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-zinc-500">
                        Photo {i + 1}
                        {i === 0 ? " · primary" : ""}
                      </span>
                      <button
                        type="button"
                        disabled={typeForm.gallery.length <= 1}
                        onClick={() => removeGalleryShot(i)}
                        className="text-xs text-red-600 hover:underline disabled:opacity-30 dark:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                    <Field label="Label">
                      <input
                        value={shot.label}
                        onChange={(e) =>
                          updateGalleryShot(i, "label", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Bedroom"
                      />
                    </Field>
                    <Field label="Image URL" className="mt-2">
                      <input
                        value={shot.src}
                        onChange={(e) =>
                          updateGalleryShot(i, "src", e.target.value)
                        }
                        className={inputClass}
                        placeholder="https://…"
                      />
                    </Field>
                  </li>
                ))}
              </ul>
            </div>

            {typeError ? (
              <p className="text-sm text-red-600 dark:text-red-400">{typeError}</p>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTypeForm(null)}
                className={btnGhost}
              >
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                Save type
              </button>
            </div>
          </form>
        ) : null}
      </Modal>

      <Modal
        open={deleteUnitId !== null}
        onClose={() => setDeleteUnitId(null)}
        title="Delete unit?"
        description="Removes this key from demo inventory in this browser."
      >
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setDeleteUnitId(null)}
            className={btnGhost}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setUnits((prev) => prev.filter((u) => u.id !== deleteUnitId));
              setDeleteUnitId(null);
            }}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className ?? ""}`}>
      <span className="font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </span>
      {children}
    </label>
  );
}

function UnitsPanel({
  counts,
  unitTable,
  onAdd,
  onEdit,
  onDelete,
}: {
  counts: {
    available: number;
    occupied: number;
    dirty: number;
    oos: number;
  };
  unitTable: ReturnType<typeof useClientTable<RoomUnit>>;
  onAdd: () => void;
  onEdit: (u: RoomUnit) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 gap-3 sm:grid-cols-4">
          {(
            [
              ["Available", counts.available],
              ["Occupied", counts.occupied],
              ["Dirty", counts.dirty],
              ["Out of service", counts.oos],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {label}
              </p>
              <p className="mt-2 text-2xl font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                {value}
              </p>
            </div>
          ))}
        </div>
        <button type="button" onClick={onAdd} className={btnPrimary + " shrink-0"}>
          Add unit
        </button>
      </div>

      <div className="mb-4">
        <TableToolbar
          search={unitTable.query}
          onSearchChange={unitTable.setQuery}
          searchPlaceholder="Search unit, type, guest…"
          filter={unitTable.filter}
          onFilterChange={unitTable.setFilter}
          filterOptions={unitFilterOptions}
          filterLabel="Filter"
          total={unitTable.total}
          page={unitTable.page}
          pageSize={unitTable.pageSize}
          pageCount={unitTable.pageCount}
          onPageChange={unitTable.setPage}
          hasActiveFilters={unitTable.hasActiveFilters}
          onClear={unitTable.clear}
        />
      </div>

      {unitTable.total === 0 ? (
        <EmptyState
          icon="inbox"
          title="No units match"
          description="Try another search or add a unit."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-900">
                  <th className="px-4 py-3 font-medium">Unit</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Inventory</th>
                  <th className="px-4 py-3 font-medium">Housekeeping</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {unitTable.pageItems.map((u) => (
                  <tr
                    key={u.id}
                    className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium tabular-nums text-zinc-900 dark:text-zinc-50">
                        #{u.number}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Floor {u.floor}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {u.roomName}
                    </td>
                    <td className="px-4 py-3">
                      <InventoryBadge status={u.inventory} />
                    </td>
                    <td className="px-4 py-3">
                      <HousekeepingBadge status={u.housekeeping} />
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500">
                      {u.currentGuest
                        ? `Guest: ${u.currentGuest}`
                        : u.nextArrival
                          ? `Next: ${formatShortDate(u.nextArrival)}`
                          : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(u)}
                          className="text-xs font-medium text-zinc-700 hover:underline dark:text-zinc-300"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(u.id)}
                          className="text-xs font-medium text-red-600 hover:underline dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function TypesPanel({
  catalog,
  onEdit,
}: {
  catalog: Room[];
  onEdit: (r: Room) => void;
}) {
  return (
    <>
      <p className="mb-4 text-sm text-zinc-500">
        Public room types — rates, featured flag, and gallery (label + image
        URL). Demo overrides stay in this browser until you connect a CMS.
      </p>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-900">
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Gallery</th>
                <th className="px-4 py-3 font-medium">From</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {catalog.map((r) => (
                <tr
                  key={r.slug}
                  className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">
                      {r.name}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{r.slug}</p>
                  </td>
                  <td className="px-4 py-3 capitalize text-zinc-600 dark:text-zinc-400">
                    {r.category}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-600 dark:text-zinc-400">
                    {r.gallery.length} photos
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-800 dark:text-zinc-200">
                    ${r.priceFrom}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-500">
                    {r.featured ? "Yes" : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onEdit(r)}
                      className="text-xs font-medium text-zinc-700 hover:underline dark:text-zinc-300"
                    >
                      Edit type & gallery
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
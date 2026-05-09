"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import data from "../../data/projects.json";

type Project = {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: number | null;
  parent_id: number | null;
  show_on_website: boolean | number;
  icon: string | null;
  content: string;
  file_name: string | null;
  created_at: string;
  updated_at: string;
  tags: string[];
  children?: Project[];
};

type ColumnDef = {
  key: StatusKey;
  label: string;
  color: string;
  border: string;
  badge: string;
};

type StatusKey = "idea" | "in-progress" | "done" | "perpetual";
type ViewMode = "all" | "personal" | "academic";

const COLUMNS: ColumnDef[] = [
  {
    key: "idea",
    label: "Ideas",
    color: "from-purple-500/10 to-fuchsia-600/10",
    border: "border-purple-500/30",
    badge: "bg-purple-500/20 text-purple-300",
  },
  {
    key: "in-progress",
    label: "In Progress",
    color: "from-cyan-500/10 to-sky-600/10",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300",
  },
  {
    key: "done",
    label: "Done",
    color: "from-emerald-500/10 to-green-600/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  {
    key: "perpetual",
    label: "Perpetual",
    color: "from-amber-500/10 to-orange-600/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300",
  },
];

const STATUS_KEY = "dashboard-status-overrides";
const WEBSITE_KEY = "dashboard-website-overrides";
const PRIORITY_KEY = "dashboard-priority-overrides";
const VIEW_MODE_KEY = "dashboard-view-mode";
const ALL_ITEMS: Project[] = data.items;
const TOP_LEVEL = ALL_ITEMS.filter((it) => !it.parent_id);

const PRIORITY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "🔴 Critical", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  2: { label: "🟠 High", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  3: { label: "🟡 Normal", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  4: { label: "🟢 Low", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  5: { label: "⚪ Icebox", color: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "done":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    case "in-progress":
      return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
    case "perpetual":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    default:
      return "bg-purple-500/15 text-purple-300 border-purple-500/30";
  }
}

function loadJson(key: string): Record<number, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return Object.fromEntries(
      Object.entries(parsed).map(([k, v]) => [Number(k), String(v)])
    );
  } catch {
    return {};
  }
}

function saveJson(key: string, value: Record<number, string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function loadViewMode(): ViewMode {
  if (typeof window === "undefined") return "all";
  try {
    const raw = localStorage.getItem(VIEW_MODE_KEY);
    if (raw === "personal" || raw === "academic") return raw;
    return "all";
  } catch {
    return "all";
  }
}

function saveViewMode(mode: ViewMode) {
  if (typeof window === "undefined") return;
  localStorage.setItem(VIEW_MODE_KEY, mode);
}

function isAcademic(item: Project): boolean {
  return item.tags.some((t) => t.toLowerCase() === "academic");
}

function DeployButton({ websiteOverrides }: { websiteOverrides: Record<number, string> }) {
  const [deploying, setDeploying] = useState(false);
  const [deployMsg, setDeployMsg] = useState<string | null>(null);

  const handleDeploy = async () => {
    setDeploying(true);
    setDeployMsg(null);
    try {
      const res = await fetch("http://127.0.0.1:5123/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteOverrides }),
      });
      const data = await res.json();
      if (data.status === "ok" && data.returncode === 0) {
        setDeployMsg("✅ Deployed! Check Vercel for progress.");
      } else {
        setDeployMsg(`❌ Error: ${data.stderr || data.message || "Unknown error"}`);
      }
    } catch (e) {
      setDeployMsg(`❌ Network error: ${e}`);
    } finally {
      setDeploying(false);
      setTimeout(() => setDeployMsg(null), 8000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDeploy}
        disabled={deploying}
        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
          deploying
            ? "bg-neutral-700 text-neutral-400 cursor-wait"
            : "bg-emerald-600 text-white hover:bg-emerald-500"
        }`}
      >
        {deploying ? "Deploying…" : "🚀 Deploy"}
      </button>
      {deployMsg && (
        <div className="absolute top-full right-0 mt-2 w-64 text-xs p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 z-50">
          {deployMsg}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [items, setItems] = useState<Project[]>(TOP_LEVEL);
  const [savedStatus, setSavedStatus] = useState<Record<number, string>>({});
  const [pendingStatus, setPendingStatus] = useState<Record<number, string>>({});
  const [savedWebsite, setSavedWebsite] = useState<Record<number, string>>({});
  const [pendingWebsite, setPendingWebsite] = useState<Record<number, string>>({});
  const [savedPriority, setSavedPriority] = useState<Record<number, string>>({});
  const [pendingPriority, setPendingPriority] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<Project | null>(null);
  const [dragOverCol, setDragOverCol] = useState<StatusKey | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  useEffect(() => {
    const st = loadJson(STATUS_KEY);
    const ws = loadJson(WEBSITE_KEY);
    const pr = loadJson(PRIORITY_KEY);
    const vm = loadViewMode();
    setSavedStatus(st);
    setPendingStatus(st);
    setSavedWebsite(ws);
    setPendingWebsite(ws);
    setSavedPriority(pr);
    setPendingPriority(pr);
    setViewMode(vm);
    setItems(
      TOP_LEVEL.map((it) => ({
        ...it,
        status: st[it.id] ?? it.status,
        priority: pr[it.id] !== undefined ? Number(pr[it.id]) : it.priority,
      }))
    );
  }, []);

  const hasUnsaved =
    JSON.stringify(pendingStatus) !== JSON.stringify(savedStatus) ||
    JSON.stringify(pendingWebsite) !== JSON.stringify(savedWebsite) ||
    JSON.stringify(pendingPriority) !== JSON.stringify(savedPriority);

  const moveItem = useCallback(
    (itemId: number, newStatus: StatusKey) => {
      const original = TOP_LEVEL.find((it) => it.id === itemId);
      const isReset = original?.status === newStatus;

      setItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, status: newStatus } : it))
      );

      setPendingStatus((prev) => {
        const next = { ...prev };
        if (isReset) {
          delete next[itemId];
        } else {
          next[itemId] = newStatus;
        }
        return next;
      });
    },
    []
  );

  const toggleWebsite = useCallback((itemId: number) => {
    const original = TOP_LEVEL.find((it) => it.id === itemId)?.show_on_website ?? false;
    const currentOverride = pendingWebsite[itemId];
    const current = currentOverride !== undefined ? currentOverride === "true" : original;
    const nextValue = !current;
    const isReset = nextValue === original;

    setPendingWebsite((prev) => {
      const next = { ...prev };
      if (isReset) {
        delete next[itemId];
      } else {
        next[itemId] = String(nextValue);
      }
      return next;
    });
  }, [pendingWebsite]);

  const setItemPriority = useCallback((itemId: number, newPriority: number) => {
    const original = TOP_LEVEL.find((it) => it.id === itemId)?.priority ?? 3;
    const isReset = original === newPriority;

    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, priority: newPriority } : it))
    );

    setPendingPriority((prev) => {
      const next = { ...prev };
      if (isReset) {
        delete next[itemId];
      } else {
        next[itemId] = String(newPriority);
      }
      return next;
    });
  }, []);

  const saveChanges = useCallback(() => {
    saveJson(STATUS_KEY, pendingStatus);
    saveJson(WEBSITE_KEY, pendingWebsite);
    saveJson(PRIORITY_KEY, pendingPriority);
    setSavedStatus(pendingStatus);
    setSavedWebsite(pendingWebsite);
    setSavedPriority(pendingPriority);
  }, [pendingStatus, pendingWebsite, pendingPriority]);

  const resetOverrides = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STATUS_KEY);
      localStorage.removeItem(WEBSITE_KEY);
      localStorage.removeItem(PRIORITY_KEY);
    }
    setSavedStatus({});
    setPendingStatus({});
    setSavedWebsite({});
    setPendingWebsite({});
    setSavedPriority({});
    setPendingPriority({});
    setItems(TOP_LEVEL);
  }, []);

  const handleViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    saveViewMode(mode);
  }, []);

  const isWebsiteVisible = (item: Project) => {
    const original = TOP_LEVEL.find((it) => it.id === item.id)?.show_on_website ?? false;
    const override = pendingWebsite[item.id];
    return override !== undefined ? override === "true" : original;
  };

  const filteredItems = items.filter((it) => {
    if (viewMode === "academic") return isAcademic(it);
    if (viewMode === "personal") return !isAcademic(it);
    return true;
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Project Tracker
            </h1>
            <p className="text-sm text-neutral-400 mt-0.5">
              {filteredItems.length} projects · synced {formatDate(data.generated_at)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {hasUnsaved && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-amber-400">Unsaved changes</span>
                  <button
                    onClick={saveChanges}
                    className="text-xs px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-colors font-medium"
                  >
                    Save
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <DeployButton websiteOverrides={pendingWebsite} />
            <button
              onClick={resetOverrides}
              className="text-xs px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 transition-colors"
            >
              Reset
            </button>
            <Link
              href="/index.html"
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 mr-1">View:</span>
            {[
              { key: "all" as ViewMode, label: "All", count: items.length },
              { key: "personal" as ViewMode, label: "Personal", count: items.filter((it) => !isAcademic(it)).length },
              { key: "academic" as ViewMode, label: "Academic", count: items.filter((it) => isAcademic(it)).length },
            ].map((vm) => (
              <button
                key={vm.key}
                onClick={() => handleViewMode(vm.key)}
                className={`text-xs px-3 py-1 rounded-lg border transition-colors font-medium ${
                  viewMode === vm.key
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500"
                }`}
              >
                {vm.label} ({vm.count})
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {COLUMNS.map((col, colIndex) => {
            const colItems = filteredItems
              .filter((it) => it.status === col.key)
              .sort((a, b) => {
                if (col.key === "done" || col.key === "perpetual") {
                  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
                return (a.priority ?? 3) - (b.priority ?? 3);
              });
            const isDragOver = dragOverCol === col.key;

            return (
              <motion.section
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: colIndex * 0.1, duration: 0.4 }}
                className={`rounded-xl border ${col.border} ${
                  isDragOver ? "ring-2 ring-white/20" : ""
                } bg-gradient-to-b ${col.color} backdrop-blur-sm transition-all`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverCol(col.key);
                }}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverCol(null);
                  const itemId = Number(e.dataTransfer.getData("text/plain"));
                  if (itemId) moveItem(itemId, col.key);
                }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <h2 className="font-semibold text-sm tracking-wide">
                    {col.label}
                  </h2>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${col.badge}`}
                  >
                    {colItems.length}
                  </span>
                </div>

                <div className="p-3 space-y-3 min-h-[120px] max-h-[70vh] overflow-y-auto">
                  {colItems.map((item, i) => {
                    const childCount = item.children?.length || 0;
                    const onWeb = isWebsiteVisible(item);
                    const statusChanged = pendingStatus[item.id] !== undefined && pendingStatus[item.id] !== savedStatus[item.id];
                    const websiteChanged = pendingWebsite[item.id] !== undefined && pendingWebsite[item.id] !== savedWebsite[item.id];
                    const isChanged = statusChanged || websiteChanged;
                    const p = item.priority ?? 3;
                    const pInfo = PRIORITY_LABELS[p] || PRIORITY_LABELS[3];
                    const academic = isAcademic(item);

                    return (
                      <motion.article
                        key={item.id}
                        layout
                        layoutId={`card-${item.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: colIndex * 0.1 + i * 0.05 }}
                        whileHover={{ y: -3, scale: 1.01 }}
                        draggable
                        onDragStart={(e) => {
                          const de = e as unknown as DragEvent;
                          if (de.dataTransfer) {
                            de.dataTransfer.setData(
                              "text/plain",
                              String(item.id)
                            );
                            de.dataTransfer.effectAllowed = "move";
                          }
                        }}
                        onClick={() => setSelected(item)}
                        className={`group bg-neutral-900/80 border rounded-lg p-4 hover:border-neutral-600 transition-colors cursor-grab active:cursor-grabbing ${
                          isChanged
                            ? "border-amber-500/40 ring-1 ring-amber-500/20"
                            : "border-neutral-800"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm mb-1 group-hover:text-violet-300 transition-colors">
                            {item.icon ? <span className="mr-1.5">{item.icon}</span> : null}
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                            {academic && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                🎓
                              </span>
                            )}
                            {(col.key === "idea" || col.key === "in-progress") && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${pInfo.color}`}>
                                {p}
                              </span>
                            )}
                            {onWeb && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                🌐
                              </span>
                            )}
                            {isChanged && (
                              <span className="shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-1" />
                            )}
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-xs text-neutral-400 leading-relaxed mb-3 line-clamp-3">
                            {item.description}
                          </p>
                        )}

                        {childCount > 0 && (
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                              {childCount} sub-item{childCount > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}

                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {item.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 4 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-500">
                                +{item.tags.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-neutral-500">
                          <span className="uppercase tracking-wider">
                            {item.type}
                          </span>
                          <span>{formatDate(item.updated_at)}</span>
                        </div>
                      </motion.article>
                    );
                  })}

                  {colItems.length === 0 && (
                    <div className="text-center py-8 text-neutral-600 text-sm">
                      Drop here
                    </div>
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-sm rounded-t-2xl">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {selected.icon ? <span className="mr-2">{selected.icon}</span> : null}
                    {selected.title}
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                    <span>{formatDateTime(selected.created_at)}</span>
                    <span>·</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${(PRIORITY_LABELS[selected.priority ?? 3] || PRIORITY_LABELS[3]).color}`}>
                      {(PRIORITY_LABELS[selected.priority ?? 3] || PRIORITY_LABELS[3]).label}
                    </span>
                    {isAcademic(selected) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        🎓 Academic
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">
                {selected.description && (
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selected.description}
                  </p>
                )}

                {/* Priority selector */}
                <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3">
                  <p className="text-sm font-medium text-neutral-200 mb-2">
                    Priority
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const pInfo = PRIORITY_LABELS[level];
                      const current = (selected.priority ?? 3);
                      const active = current === level;
                      return (
                        <button
                          key={level}
                          onClick={() => setItemPriority(selected.id, level)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                            active
                              ? pInfo.color
                              : "border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500"
                          }`}
                        >
                          {pInfo.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Website toggle */}
                <div className="flex items-center justify-between bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">
                      Show on portfolio website
                    </p>
                    <p className="text-xs text-neutral-500">
                      Toggle to control visibility on the homepage
                    </p>
                  </div>
                  <button
                    onClick={() => toggleWebsite(selected.id)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      isWebsiteVisible(selected)
                        ? "bg-violet-600"
                        : "bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        isWebsiteVisible(selected) ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>

                {selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {selected.content && (
                  <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      Notes
                    </h3>
                    <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed">
                      {selected.content}
                    </pre>
                  </div>
                )}

                {selected.children && selected.children.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                      Sub-items
                    </h3>
                    <div className="space-y-2">
                      {selected.children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center justify-between bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-200 truncate">
                              {child.title}
                            </p>
                            {child.description && (
                              <p className="text-xs text-neutral-500 truncate mt-0.5">
                                {child.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 ml-4 shrink-0">
                            {child.tags.length > 0 && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                                {child.tags[0]}
                                {child.tags.length > 1 &&
                                  ` +${child.tags.length - 1}`}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(
                                child.status
                              )}`}
                            >
                              {child.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-neutral-800 rounded-b-2xl flex items-center justify-between text-xs text-neutral-500">
                <span className="uppercase tracking-wider">{selected.type}</span>
                <span>Updated {formatDateTime(selected.updated_at)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

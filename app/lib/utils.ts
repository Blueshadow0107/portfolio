export function statusGradient(status: string): string {
  switch (status) {
    case "done":
      return "from-emerald-500/20 to-teal-600/20";
    case "in-progress":
      return "from-cyan-500/20 to-sky-600/20";
    case "perpetual":
      return "from-amber-500/20 to-orange-600/20";
    default:
      return "from-purple-500/20 to-fuchsia-600/20";
  }
}

export function statusBadgeClass(status: string): string {
  switch (status) {
    case "done":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "in-progress":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    case "perpetual":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    default:
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
  }
}

export function statusIcon(status: string): string {
  switch (status) {
    case "done":
      return "✅";
    case "in-progress":
      return "🔨";
    case "perpetual":
      return "♾️";
    default:
      return "💡";
  }
}

export function loadWebsiteOverrides(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("dashboard-website-overrides");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return Object.fromEntries(
      Object.entries(parsed).map(([k, v]) => [Number(k), v === "true"])
    );
  } catch {
    return {};
  }
}

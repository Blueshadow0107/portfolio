"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import data from "../data/projects.json";

type JsonProject = {
  id: number;
  title: string;
  description: string;
  status: string;
  parent_id: number | null;
  show_on_website: boolean | number;
  icon: string | null;
  tags: string[];
  content: string;
  children?: JsonProject[];
};

type AcademicProject = {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: string;
};

type UnifiedProject = {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  gradient: string;
  icon: string;
  content?: string;
  children?: JsonProject[];
};

const ACADEMIC: AcademicProject[] = [
  {
    title: "HiLiftPW-1 Grid Generation",
    description:
      "Generated a 24.6M-cell hybrid-unstructured mesh for the NASA Trapezoidal Wing (HiLiftPW-1) using Pointwise T-Rex. Targeted y+ ~ 1 at Re = 7.5M with 30 prism layers and structured wake refinement.",
    tech: ["Pointwise", "ANSYS Fluent", "Grid Gen"],
    gradient: "from-fuchsia-500/20 to-pink-600/20",
    icon: "✈️",
  },
  {
    title: "Numerical Methods & HPC Analysis",
    description:
      "Implemented and analysed FTCS, Upwind, Lax-Friedrichs and Lax-Wendroff schemes for 1D advection. Performed parallel scaling and carbon-footprint assessment of UCNS3D on Cranfield HPC clusters.",
    tech: ["Fortran 90", "Python", "MPI", "UCNS3D"],
    gradient: "from-orange-500/20 to-amber-600/20",
    icon: "📊",
  },
  {
    title: "Compressible Flow Solver",
    description:
      "Implemented a 1D Euler solver with Minmod slope limiting and HLL/HLLC Riemann solvers. Analysed 2D UCNS3D results for Riemann problems, Mach 3 forward-facing step, and double Mach reflection.",
    tech: ["Fortran 90", "UCNS3D", "Python", "ParaView"],
    gradient: "from-rose-500/20 to-red-600/20",
    icon: "🌊",
  },
  {
    title: "Dual-Mission UAV Design",
    description:
      "Group design project: convertible fixed-wing / quad-rotor UAV concept. CFD hover validation, grid-convergence study (~2M / 5M / 10M cells), RPM parametric study, and turbulence model comparison.",
    tech: ["ANSYS Fluent", "MATLAB", "Python", "OpenVSP"],
    gradient: "from-cyan-500/20 to-indigo-600/20",
    icon: "🛸",
  },
  {
    title: "Lid-Driven Cavity Flow Solver",
    description:
      "Built a 2D incompressible Navier-Stokes solver using SIMPLE + TDMA on a staggered grid. Validated against Ghia et al. (1982) at Re = 100–1000, with grid convergence studies and central-difference comparison.",
    tech: ["Fortran 90", "Python", "NumPy", "LaTeX"],
    gradient: "from-lime-500/20 to-green-600/20",
    icon: "🌀",
  },
];

function statusGradient(status: string): string {
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

function statusBadgeClass(status: string): string {
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

function statusIcon(status: string): string {
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

// Merge academic + JSON projects
function loadWebsiteOverrides(): Record<number, boolean> {
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

const ALL_JSON: JsonProject[] = data.items.filter((it: JsonProject) => !it.parent_id);
const ALL_PROJECTS: UnifiedProject[] = [
  ...ACADEMIC.map((p, i) => ({
    id: 100 + i,
    ...p,
    status: "done",
    tags: p.tech,
  })),
  ...ALL_JSON.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    status: p.status,
    tags: p.tags,
    gradient: statusGradient(p.status),
    icon: p.icon || statusIcon(p.status),
    content: p.content,
    children: p.children,
  })),
];

const journey = [
  {
    phase: "Now",
    role: "MSc Researcher — CFD & Machine Learning",
    detail:
      "At Cranfield University, executing high-fidelity CFD simulations (ANSYS Fluent, OpenFOAM) and developing Neural Network-based surrogate models to accelerate aerodynamic design cycles.",
  },
  {
    phase: "Recent",
    role: "Thesis Researcher — AI-Enhanced Microfluidics",
    detail:
      "At BITS Pilani, designed a microfluidic sensor and developed AI-based detection algorithms using machine learning for real-time fluid analysis, bridging CFD with sensor technology.",
  },
  {
    phase: "Education",
    role: "MSc CFD @ Cranfield | Dual Degree @ BITS Pilani",
    detail:
      "MSc in Computational Fluid Dynamics (Cranfield, 2025–2026) and a 5-year dual degree in Physics + Mechanical Engineering (BITS Pilani, 2020–2025). Core focus: fluid mechanics, aerodynamics, HPC, and numerical methods.",
  },
];

const skillCategories = [
  {
    name: "CFD & Simulation",
    skills: ["OpenFOAM", "ANSYS Fluent", "Pointwise", "SpaceClaim", "Mesh Generation", "Turbulence Modelling", "CAD", "SolidWorks", "ParaView"],
  },
  {
    name: "Programming & Data",
    skills: ["Python", "MATLAB", "Fortran 90", "C / C++", "NumPy", "Pandas", "Matplotlib", "Git", "Linux"],
  },
  {
    name: "Machine Learning",
    skills: ["Neural Networks", "Surrogate Modeling", "Scikit-learn", "TensorFlow", "Keras", "Pattern Recognition"],
  },
  {
    name: "Engineering & Analysis",
    skills: ["Data Analysis", "Statistical Analysis", "Data Visualization", "HPC / MPI", "LaTeX", "MS Office"],
  },
  {
    name: "Soft Skills",
    skills: ["Problem-solving", "Technical Communication", "Independent Research", "Time Management", "Stakeholder Engagement"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [selected, setSelected] = useState<UnifiedProject | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set(ALL_PROJECTS.map((p) => p.id)));

  useEffect(() => {
    const overrides = loadWebsiteOverrides();
    const visible = new Set(
      ALL_PROJECTS
        .filter((p) => {
          if (p.id >= 100) return true; // academic projects always visible
          const jsonItem = ALL_JSON.find((it) => it.id === p.id);
          if (!jsonItem) return false;
          return overrides[p.id] ?? jsonItem.show_on_website;
        })
        .map((p) => p.id)
    );
    setVisibleIds(visible);
  }, []);

  const displayedProjects = ALL_PROJECTS.filter((p) => visibleIds.has(p.id));

  const allTags = useMemo(
    () => Array.from(new Set(displayedProjects.flatMap((p) => p.tags))).sort(),
    [displayedProjects]
  );

  const filteredProjects = useMemo(() => {
    if (!activeTag) return displayedProjects;
    return displayedProjects.filter((p) => p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()));
  }, [activeTag, displayedProjects]);

  const dimmedProjects = useMemo(() => {
    if (!activeTag) return new Set<number>();
    return new Set(displayedProjects.filter((p) => !p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())).map((p) => p.id));
  }, [activeTag, displayedProjects]);

  return (
    <main className="min-h-screen bg-[#0a0514]">
      <header className="sticky top-0 z-50 border-b border-purple-500/20 bg-[#0a0514]/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="text-lg font-bold text-white">SV</a>
          <nav className="flex gap-4 text-sm font-medium text-violet-300">
            <a href="#projects" className="transition hover:text-cyan-400">Projects</a>
            <a href="#about" className="transition hover:text-cyan-400">About</a>
            <a href="#connect" className="transition hover:text-cyan-400">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-6 md:pt-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Hi, I&apos;m Srivijayesh Venugopal, a CFD engineer bridging fluid dynamics, high-performance computing, and machine learning.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-violet-300 sm:text-lg">
            MSc Computational Fluid Dynamics student at Cranfield University. Dual-degree engineer (Physics + Mechanical) from BITS Pilani. 
            I build simulation pipelines, surrogate models, and data-driven tools for aerodynamics and beyond.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#projects"
              className="w-full rounded-xl bg-cyan-400 px-6 py-3 text-center font-semibold text-[#0a0514] transition hover:bg-cyan-300 sm:w-auto"
            >
              View My Work
            </a>
            <a
              href="#connect"
              className="w-full rounded-xl border border-purple-500/30 bg-purple-900/40 px-6 py-3 text-center font-semibold text-violet-100 transition hover:border-electric-blue hover:text-electric-blue sm:w-auto"
            >
              Let&apos;s Connect
            </a>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Project Grid</h2>
          <p className="mt-2 text-violet-300">Selected builds and experiments from my personal workspace.</p>
        </motion.div>

        {/* Tag filter */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4"
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-neutral-500 mr-1">Filter:</span>
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-2.5 py-1 rounded-full border transition ${
                !activeTag
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "border-purple-500/30 bg-purple-900/50 text-violet-300 hover:border-cyan-400/50"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`text-xs px-2.5 py-1 rounded-full border transition ${
                  activeTag === tag
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "border-purple-500/30 bg-purple-900/50 text-violet-300 hover:border-cyan-400/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const isDimmed = dimmedProjects.has(project.id);
              const isHidden = activeTag && !filteredProjects.some((p) => p.id === project.id);
              if (isHidden) return null;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  onClick={() => setSelected(project)}
                  className={`glass-card overflow-hidden transition cursor-pointer hover:border-purple-500/40 ${
                    isDimmed ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                    <span className="text-5xl select-none">{project.icon}</span>
                    {project.status !== "done" && (
                      <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(project.status)}`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-violet-300">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 6).map((item) => (
                        <span
                          key={item}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                            activeTag === item
                              ? "border-cyan-400/50 bg-cyan-900/40 text-cyan-300"
                              : "border-purple-500/30 bg-purple-900/50 text-fuchsia-300"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 pb-16 sm:px-6 md:grid-cols-5">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 md:col-span-3"
        >
          <h2 className="text-2xl font-semibold text-white">Experience / About</h2>
          <ol className="mt-6 space-y-5">
            {journey.map((item) => (
              <li key={item.phase} className="relative border-l border-purple-500/30 pl-4">
                <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-electric-blue" />
                <p className="text-xs font-semibold uppercase tracking-widest text-electric-blue">{item.phase}</p>
                <p className="mt-1 text-base font-medium text-white">{item.role}</p>
                <p className="mt-1 text-sm text-violet-300">{item.detail}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.aside
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 md:col-span-2"
        >
          <h3 className="text-lg font-semibold text-white">Core Skills</h3>
          <div className="mt-5 space-y-5">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{cat.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-purple-500/30 bg-purple-900/50 px-3 py-1.5 text-sm text-violet-200 transition hover:border-cyan-400/50 hover:text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.aside>

        <motion.aside
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 md:col-span-2"
        >
          <h3 className="text-lg font-semibold text-white">Languages & Interests</h3>
          <div className="mt-4 space-y-3 text-sm text-violet-300">
            <div>
              <p className="font-medium text-violet-200">Languages</p>
              <p className="mt-1">English · Tamil · Hindi · Telugu · Spanish · Japanese</p>
            </div>
            <div>
              <p className="font-medium text-violet-200">Interests</p>
              <p className="mt-1">Formula 1 · Motorsport engineering · Aerodynamics · Renewable energy · Emerging tech</p>
            </div>
          </div>
        </motion.aside>
      </section>

      {/* Contact */}
      <footer id="connect" className="border-t border-purple-500/20 bg-[#05030a]/70">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 md:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="glass-card p-5 md:col-span-2"
          >
            <h3 className="text-lg font-semibold text-white">Scan to Connect</h3>
            <div className="mt-4 flex h-44 items-center justify-center rounded-xl border border-purple-500/30 bg-white p-3">
              <QRCodeSVG
                value="https://www.linkedin.com/in/srivijayesh-venugopal-46780b215/"
                size={152}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="M"
              />
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/in/srivijayesh-venugopal-46780b215/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-purple-500/30 px-3 py-2 text-sm text-violet-200 transition hover:border-cyan-400 hover:text-fuchsia-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Blueshadow0107"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-purple-500/30 px-3 py-2 text-sm text-violet-200 transition hover:border-cyan-400 hover:text-fuchsia-300"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="glass-card space-y-4 p-5 md:col-span-3"
          >
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="text-sm text-violet-300">
              Have a project in mind or just want to connect? Shoot me an email — I&apos;d love to hear from you.
            </p>
            <a
              href="mailto:srivijayeshv@gmail.com?subject=Hello%20from%20your%20portfolio"
              className="inline-block w-full rounded-xl bg-electric-blue px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
            >
              Email Me
            </a>
          </motion.div>
        </div>
      </footer>

      <div className="border-t border-purple-500/20 bg-[#05030a] py-4 text-center text-xs text-violet-500">
        © {new Date().getFullYear()} Srivijayesh Venugopal. Built with Next.js & Tailwind CSS.
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
                  <h2 className="text-lg font-bold text-white">{selected.title}</h2>
                  {selected.status !== "done" && (
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(selected.status)}`}>
                      {selected.status}
                    </span>
                  )}
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
                  <p className="text-sm text-neutral-300 leading-relaxed">{selected.description}</p>
                )}

                {selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {selected.content && (
                  <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Notes</h3>
                    <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed">{selected.content}</pre>
                  </div>
                )}

                {selected.children && selected.children.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Sub-items</h3>
                    <div className="space-y-2">
                      {selected.children.map((child) => (
                        <div key={child.id} className="flex items-center justify-between bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-neutral-200 truncate">{child.title}</p>
                            {child.description && (
                              <p className="text-xs text-neutral-500 truncate mt-0.5">{child.description}</p>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(child.status)}`}>
                            {child.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

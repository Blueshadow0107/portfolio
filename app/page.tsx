"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import data from "../data/projects.json";
import { JsonProject, UnifiedProject } from "./types";
import { statusGradient, statusIcon, loadWebsiteOverrides } from "./lib/utils";
import TagFilter from "./components/TagFilter";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

const ACADEMIC = [
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

const ALL_JSON: JsonProject[] = data.items.filter(
  (it: JsonProject) => !it.parent_id && Boolean(it.show_on_website)
);
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
          if (p.id >= 100) return true;
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

        <TagFilter allTags={allTags} activeTag={activeTag} onChange={setActiveTag} />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isDimmed={dimmedProjects.has(project.id)}
              isHidden={activeTag ? !filteredProjects.some((p) => p.id === project.id) : false}
              activeTag={activeTag}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </section>

      <AboutSection />
      <ContactSection />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </main>
  );
}

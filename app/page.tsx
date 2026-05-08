"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const projects = [
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
  {
    title: "Prompt-to-CAD",
    description:
      "CLI tool that turns natural language into executable CAD models using a fine-tuned vision-language model. Generates CadQuery code, STL/STEP exports, and rendered previews.",
    tech: ["Python", "PyTorch", "CadQuery", "Transformers"],
    gradient: "from-indigo-500/20 to-violet-600/20",
    icon: "🧊",
  },
  {
    title: "RPG Map Engine",
    description:
      "Canvas-powered map authoring and scene tools inspired by classic tile-based RPG workflows.",
    tech: ["Flask", "JavaScript", "Canvas"],
    gradient: "from-emerald-500/20 to-teal-600/20",
    icon: "🗺️",
  },
  {
    title: "PokeEmerald Expansion",
    description:
      "ROM-hack framework work focused on gameplay systems, tooling, and robust build pipelines.",
    tech: ["C", "ARM ASM", "Make"],
    gradient: "from-amber-500/20 to-orange-600/20",
    icon: "🎮",
  },
  {
    title: "Math In Motion Assets",
    description:
      "Animation source pipeline for educational math videos, rendered in a repeatable production flow.",
    tech: ["Python", "Manim", "Kdenlive"],
    gradient: "from-violet-500/20 to-purple-600/20",
    icon: "📐",
  },
  {
    title: "Hyprland Rice Docs",
    description:
      "Workflow-focused Linux desktop documentation with automation scripts and curated setup references.",
    tech: ["Markdown", "Shell", "Hyprland"],
    gradient: "from-sky-500/20 to-blue-600/20",
    icon: "🐧",
  },
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card overflow-hidden transition hover:border-purple-500/30/80"
            >
              <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="text-5xl select-none">{project.icon}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-violet-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-purple-500/30 bg-purple-900/50 px-3 py-1 text-xs font-medium text-fuchsia-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

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
    </main>
  );
}

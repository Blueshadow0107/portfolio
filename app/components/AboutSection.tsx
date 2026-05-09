"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

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

export default function AboutSection() {
  return (
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
  );
}

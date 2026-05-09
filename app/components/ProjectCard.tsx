"use client";

import { motion } from "framer-motion";
import { UnifiedProject } from "../types";
import { statusBadgeClass } from "../lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectCard({
  project,
  index,
  isDimmed,
  isHidden,
  activeTag,
  onClick,
}: {
  project: UnifiedProject;
  index: number;
  isDimmed: boolean;
  isHidden: boolean;
  activeTag: string | null;
  onClick: () => void;
}) {
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
      onClick={onClick}
      className={`glass-card overflow-hidden transition cursor-pointer hover:border-purple-500/40 ${
        isDimmed ? "opacity-30" : "opacity-100"
      }`}
    >
      <div
        className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
      >
        <span className="text-5xl select-none">{project.icon}</span>
        {project.status !== "done" && (
          <span
            className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(
              project.status
            )}`}
          >
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
}

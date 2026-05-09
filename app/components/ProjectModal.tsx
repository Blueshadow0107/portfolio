"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UnifiedProject } from "../types";
import { statusBadgeClass } from "../lib/utils";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: UnifiedProject | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                <h2 className="text-lg font-bold text-white">{project.title}</h2>
                {project.status !== "done" && (
                  <span
                    className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {project.description && (
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.content && (
                <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Notes
                  </h3>
                  <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {project.content}
                  </pre>
                </div>
              )}

              {project.children && project.children.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    Sub-items
                  </h3>
                  <div className="space-y-2">
                    {project.children.map((child) => (
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
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass(
                            child.status
                          )}`}
                        >
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
  );
}

"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function TagFilter({
  allTags,
  activeTag,
  onChange,
}: {
  allTags: string[];
  activeTag: string | null;
  onChange: (tag: string | null) => void;
}) {
  return (
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
          onClick={() => onChange(null)}
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
            onClick={() => onChange(tag === activeTag ? null : tag)}
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
  );
}

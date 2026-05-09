"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  return (
    <>
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
    </>
  );
}

import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Shield,
  Radar,
  Terminal,
  Cpu,
  Globe,
  Mail,
  Github,
  Linkedin,
  Download,
  Sparkles,
  Trophy,
  Briefcase,
  GraduationCap,
  Layers,
  Activity,
  Map,
  Swords,
  BookOpen,
  Star,
  CheckCircle2,
  BadgeCheck,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

import cryptoBackend from "./assets/projects/crypto/backend.png";
import cryptoDisplay1 from "./assets/projects/crypto/display1.png";
import cryptoDisplay2 from "./assets/projects/crypto/display2.png";

import vjNode from "./assets/projects/VirtualJamming/node.png";
import vjTable from "./assets/projects/VirtualJamming/oneofthetable.png";
import vjTraining from "./assets/projects/VirtualJamming/training.png";

import plcLogin from "./assets/projects/plc/login.png";
import plcDashboard from "./assets/projects/plc/dashboard.png";
import plcModule from "./assets/projects/plc/material.png";
import plcLesson from "./assets/projects/plc/quiz.png";
import plcSimulation from "./assets/projects/plc/simulation.png";
import plcChat from "./assets/projects/plc/chatbot.png";

import wafDashboard from "./assets/projects/btp/Dashboard.png";
import wafRuangan from "./assets/projects/btp/ruangan.png";
import wafBlockIP3 from "./assets/projects/btp/blockip3.png";
import wafBlockIP4 from "./assets/projects/btp/blockip4.png";
import wafBlockIP5 from "./assets/projects/btp/loginattempt.png";
import wafBlockIP6 from "./assets/projects/btp/failedlogin.png";
import userPhoto1 from "./assets/projects/user/king.png";

import userPhoto from "./assets/projects/user/webporto.png";
/**
 * Updated from uploaded JSX:
 * - Dynamic screenshots per project
 * - Screenshot lightbox preview
 * - Better modal layout
 * - PLC screenshots only show on PLC project
 */

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function useParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.3 });
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(sx, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(sy, [-0.5, 0.5], [20, 80]);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(clamp(x, -0.5, 0.5));
    my.set(clamp(y, -0.5, 0.5));
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return { rotX, rotY, glowX, glowY, onMove, onLeave };
}

function Chip({ icon: Icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-white/70" />
      <span>{text}</span>
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/60">{label}</div>
        <Icon className="h-4 w-4 text-white/60" />
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}

function ProgressBar({ label, value = 70 }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/70">{label}</span>
        <span className="text-white/50">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400/90 via-indigo-400/90 to-fuchsia-400/90"
        />
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur " +
        className
      }
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(600px_220px_at_40%_0%,#000_35%,transparent_65%)]">
        <div className="absolute -top-32 left-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -top-28 right-0 h-80 w-80 rounded-full bg-fuchsia-500/12 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Quest({
  title,
  desc,
  tags = [],
  level = "Side Quest",
  status = "Complete",
  icon: Icon = CheckCircle2,
}) {
  const badge =
    status === "Complete"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-400/20"
      : status === "In Progress"
      ? "bg-amber-500/15 text-amber-200 border-amber-400/20"
      : "bg-white/10 text-white/70 border-white/10";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <Icon className="h-4 w-4 text-white/75" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                {level}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/60">{desc}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] ${badge}`}>
          {status}
        </span>
      </div>

      {tags.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

function InventorySkill({ name, desc, icon: Icon, stars = 4 }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.14)]"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
          <Icon className="h-4 w-4 text-white/75" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate text-sm font-semibold text-white">{name}</div>
            <div className="flex min-w-[110px] items-center justify-end gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < stars ? "text-white/75" : "text-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-white/60">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/95 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="text-sm font-semibold text-white">{title}</div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="max-h-[78vh] overflow-auto p-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Lightbox({ open, image, title, onClose }) {
  return (
    <AnimatePresence>
      {open && image ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/85" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-6xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium text-white/80">{title}</div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
              >
                Close Preview
              </button>
            </div>
            <img
              src={image}
              alt={title}
              className="max-h-[80vh] w-full rounded-2xl border border-white/10 object-contain shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BackgroundFX() {
  const dots = useMemo(() => {
    const n = 52;
    return Array.from({ length: n }).map((_, i) => {
      const size = 2 + (i % 3);
      const x = (i * 97) % 100;
      const y = (i * 53) % 100;
      const dur = 6 + (i % 7);
      const delay = (i % 9) * 0.25;
      return { i, size, x, y, dur, delay };
    });
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.14),transparent_60%)]" />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />

      {dots.map((d) => (
        <motion.div
          key={d.i}
          className="absolute rounded-full bg-white/30"
          style={{ width: d.size, height: d.size, left: `${d.x}%`, top: `${d.y}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function SceneSection({ id, innerRef, title, subtitle, icon: Icon, children }) {
  return (
    <section id={id} ref={innerRef} className="scroll-mt-28 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-5"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <Icon className="h-5 w-5 text-white/80" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Nav({ active, onJump }) {
  const items = [
    { id: "home", label: "Base", icon: Map },
    { id: "quests", label: "Quests", icon: Swords },
    { id: "skills", label: "Inventory", icon: Layers },
    { id: "timeline", label: "Timeline", icon: Activity },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "resume", label: "Resume", icon: BookOpen },
  ];

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(920px,calc(100%-32px))] items-center justify-between gap-2 rounded-3xl border border-white/10 bg-black/30 p-2 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 sm:flex">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">Portfolio HUD</span>
        </div>
        <div className="hidden h-9 w-px bg-white/10 sm:block" />
      </div>

      <div className="flex flex-1 items-center justify-around">
        {items.map((it) => {
          const is = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onJump(it.id)}
              className={`group flex flex-col items-center gap-1 rounded-2xl px-3 py-2 transition ${
                is ? "bg-white/10" : "hover:bg-white/5"
              }`}
              aria-label={it.label}
            >
              <it.icon
                className={`h-4 w-4 ${
                  is ? "text-white" : "text-white/70 group-hover:text-white"
                }`}
              />
              <span
                className={`text-[10px] ${
                  is ? "text-white" : "text-white/60 group-hover:text-white/80"
                }`}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
          <span className="text-white/80">Scroll</span> to explore
        </div>
      </div>
    </div>
  );
}


function HologramProfile({ image, name = "REX", role = "Cybersecurity Specialist" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto w-full max-w-[360px]"
    >
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-10 top-6 h-64 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-12 top-16 h-64 rounded-full bg-fuchsia-400/15 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 via-white/5 to-fuchsia-400/10 p-3 shadow-[0_0_60px_rgba(34,211,238,0.18)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] opacity-30" />
        <motion.div
          animate={{ y: ["-8%", "112%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-300/0 via-cyan-300/18 to-cyan-300/0 blur-sm"
        />

        <div className="relative rounded-[26px] border border-white/10 bg-[#08101d]/80 p-3">
          <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-cyan-400/8 via-transparent to-fuchsia-400/8" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.12),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] opacity-25" />
            <img
              src={image}
              alt={name}
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.35)]"
            />
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.14),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#08101d] to-transparent" />
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 z-20 border border-cyan-400/20"
            />
          </div>

          <div className="relative mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">Hologram ID</div>
              <div className="mt-1 text-sm font-semibold text-white">{name}</div>
              <div className="text-xs text-white/55">{role}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">Status</div>
              <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



function HeroIntroCard({ image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
      className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-indigo-400/8 to-fuchsia-400/10 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:42px_42px] opacity-30" />
      <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-cyan-400/16 blur-3xl" />
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-fuchsia-400/12 blur-3xl" />

      <div className="relative min-h-[320px] overflow-hidden rounded-[32px]">

        {/* FULL IMAGE */}
        <img
          src={image}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* DARK OVERLAY (important for readability) */}
        <div className="absolute inset-0 bg-black/10"></div>

      </div>
    </motion.div>
  );
}


export default function GamePortfolio() {
  const par = useParallax();
  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const [boot, setBoot] = useState(true);
  const [navFx, setNavFx] = useState(false);
  const [shake, setShake] = useState(false);
  const [active, setActive] = useState("home");
  const [openProject, setOpenProject] = useState(null);
  const [xpToast, setXpToast] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  const sectionIds = useMemo(
    () => ["home", "quests", "skills", "timeline", "achievements", "resume"],
    []
  );

  const refs = useRef({});
  if (!refs.current.home) {
    sectionIds.forEach((id) => (refs.current[id] = React.createRef()));
  }

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const opts = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0.01 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);

    sectionIds.forEach((id) => {
      const el = refs.current[id]?.current;
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [sectionIds]);

  function jumpTo(id) {
    const el = refs.current[id]?.current;
    if (!el) return;

    setNavFx(true);
    setShake(true);

    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    setTimeout(() => setShake(false), 220);
    setTimeout(() => setNavFx(false), 650);
  }

  function openQuest(q) {
    setOpenProject(q);
    setXpToast({ text: "+25 XP", id: Date.now() });
    setTimeout(() => setXpToast(null), 900);
  }

  function openScreenshot(src, title) {
    setPreviewImage(src);
    setPreviewTitle(title);
  }

  const profile = {
    name: "Iqra Rezky Aligrah (Rex)",
    title: "Cybersecurity • Digital Forensics • Threat Detection",
    subtitle:
      "Master’s track in Digital Forensics & Cybersecurity. I build secure systems, analyze threats, and research ML-based detection (WSN virtual jamming).",
    location: "Indonesia",
    links: {
      email: "mailto:your.rezkyaligrah@gmail.com",
      github: "https://github.com/RexAligra",
      linkedin: "https://www.linkedin.com/in/iqra-rezky-aligrah-muhammad",
      cv: "cv/CyberSecurity_CV_Iqra.pdf",
    },
  };

  const stats = [
    { label: "Core Domain", value: "Cybersecurity", icon: Shield },
    { label: "Specialty", value: "Threat Detection", icon: Radar },
    { label: "Toolkit", value: "Python + Security", icon: Terminal },
    { label: "Mode", value: "Builder / Research", icon: Cpu },
  ];

  const plcScreenshots = [
    { src: plcLogin, label: "Login Page" },
    { src: plcDashboard, label: "Dashboard" },
    { src: plcModule, label: "Learning Material" },
    { src: plcLesson, label: "Quiz Page" },
    { src: plcSimulation, label: "Simulation Page" },
    { src: plcChat, label: "AI Chatbot" },
  ];

  const vjScreenshots = [
  { src: vjNode, label: "WSN Topology & Node Simulation" },
  { src: vjTable, label: "Feature Extraction Dataset (NS2 Trace)" },
  { src: vjTraining, label: "Model Training Process (GRU-LSTM)" },
  ];

  const wafScreenshots = [
  { src: wafDashboard, label: "Dashboard Overview" },
  { src: wafRuangan, label: "Room Booking Page" },
  { src: wafBlockIP3, label: "IP Blocking" },
  { src: wafBlockIP4, label: "Response" },
  { src: wafBlockIP5, label: "Result" },
  { src: wafBlockIP6, label: "Failed Login Attempt" }
  ];

  const cryptoScreenshots = [
  { src: cryptoDisplay1, label: "Real-time Price Prediction Interface" },
  { src: cryptoDisplay2, label: "LSTM Output Visualization" },
  { src: cryptoBackend, label: "Model Training Pipeline (Python + LSTM)" },
  ];

  const quests = [
    {
      title: "Virtual Jamming Attack Detection (GRU-LSTM)",
      level: "Main Quest",
      status: "Complete",
      icon: Radar,
      desc:
        "Designed experiments in NS2/Matlab and built ML models to detect MAC-layer virtual jamming in wireless sensor networks; compared against classical and deep baselines.",
      tags: ["WSN", "NS2", "MATLAB", "GRU-LSTM", "Feature Engineering"],
      links: { paper: "https://ieeexplore.ieee.org/document/10799722" },
      screenshots: vjScreenshots,
      details: {
        highlights: [
          "Generated labeled datasets from simulation traces and extracted MAC-layer features.",
          "Trained and evaluated hybrid GRU-LSTM models; benchmarked against SVM/BiLSTM variants.",
          "Presented the project at an academic event in Alkhobar, Saudi Arabia (international exposure).",
        ],
        tech: ["Python", "MATLAB", "NS2", "Data preprocessing", "Model evaluation"],
        outcome:
          "Research-focused project; optimized for detection performance and analysis clarity.",
      },
    },
    {
      title: "Web Application Firewall (WAF), Laravel",
      level: "Side Quest",
      status: "Complete",
      icon: Shield,
      desc:
        "Built WAF protections (e.g., IP blocking / mitigation controls) for a production Laravel deployment; focused on reducing attack surface and improving logging.",
      tags: ["Laravel", "WAF", "Hardening", "Logs"],
      screenshots: wafScreenshots,
      details: {
        highlights: [
          "Implemented defensive middleware patterns and request filtering.",
          "Improved observability through structured logging and review cycles.",
          "Aligned implementation with secure deployment practices.",
        ],
        tech: ["Laravel", "PHP", "Nginx/Apache", "Security headers", "Logging"],
        outcome:
          "Security controls added to web stack; improved resilience vs common web attacks.",
      },
    },
    {
      title: "PLC Learning Platform (React + FastAPI)",
      level: "Guild Contract",
      status: "Complete",
      icon: Globe,
      desc:
        "Designed and developed a web-based PLC learning platform with authentication, modules, and progress tracking - built for industrial automation training.",
      tags: ["React", "FastAPI", "Auth", "Education"],
      screenshots: plcScreenshots,
      details: {
        highlights: [
          "Interactive learning modules for PLC concepts and ladder logic.",
          "Backend services for authentication, content management, and progress tracking.",
          "Deployed with security considerations (secrets, routing, validation).",
        ],
        tech: ["React", "FastAPI", "Python", "JWT/Auth", "Deploy"],
        outcome: "Client-ready platform; clean UX and structured learning flow.",
      },
    },
    {
      title: "Crypto Price Prediction (LSTM)",
      level: "Experiment",
      status: "Complete",
      icon: Activity,
      desc:
        "Built time-series ML pipeline for cryptocurrency price prediction using LSTM models and evaluation workflows.",
      tags: ["LSTM", "Time-series", "Evaluation"],
      screenshots: cryptoScreenshots,
      details: {
        highlights: [
          "Prepared datasets, windows, scaling, and train/test splits.",
          "Trained LSTM models and evaluated performance metrics.",
          "Packaged results into a portfolio-ready project.",
        ],
        tech: ["Python", "TensorFlow/Keras", "Pandas"],
        outcome: "Demonstrated applied ML workflow end-to-end.",
      },
    },
  ];


  const skills = [
    {
      name: "Network Security Fundamentals",
      desc: "TCP/IP knowledge, addressing, routing basics, troubleshooting, and firewalls.",
      icon: Globe,
      stars: 4,
    },
    {
      name: "Threat Detection & Analysis",
      desc: "Traffic/log analysis mindset, detection features, evaluation, and reporting.",
      icon: Radar,
      stars: 4,
    },
    {
      name: "Secure Web Development",
      desc: "WAF logic, hardening, safe auth patterns, and defensive middleware.",
      icon: Shield,
      stars: 4,
    },
    {
      name: "Python for Security & Data",
      desc: "Parsing, preprocessing, feature extraction, visualization, automation.",
      icon: Terminal,
      stars: 4,
    },
    {
      name: "ML for Security",
      desc: "LSTM/GRU-LSTM experiments, baselines comparison, and rigorous evaluation.",
      icon: Cpu,
      stars: 4,
    },
  ];

  const achievements = [
    {
      title: "Academic Rank 1 (Grade XI)",
      meta: "SMK Telkom Makassar • Avg 95.39",
      icon: Trophy,
      desc: "Top-ranked performance in Access Network Engineering program.",
    },
    {
      title: "TOEFL ITP 557",
      meta: "Englishvit • 2023",
      icon: BadgeCheck,
      desc: "Demonstrated strong English proficiency for academic/professional settings.",
    },
    {
      title: "Cisco Networking Academy, Networking Essentials",
      meta: "Indonesia Network Academy • 2019",
      icon: BadgeCheck,
      desc: "Completed networking fundamentals course including basic network security.",
    },
    {
      title: "Presented Research in Alkhobar, Saudi Arabia",
      meta: "Academic event",
      icon: Trophy,
      desc: "Presented virtual jamming attack detection project internationally.",
    },
  ];

  const timeline = [
    {
      year: "2025",
      title: "WAF Project (Laravel)",
      desc: "Built security protections for a web deployment.",
    },
    {
      year: "2023–2025",
      title: "Master’s Track, Digital Forensics & Cybersecurity",
      desc: "Research, experiments, and academic reporting.",
    },
    {
      year: "2020–2024",
      title: "B.Comp.Sc, Telkom University",
      desc: "Computer Science foundation with security focus.",
    },
    {
      year: "2019",
      title: "Internship, PT Telkom Akses Makassar",
      desc: "FTTH / access network exposure and technical operations.",
    },
  ];

  return (
    <div className="relative z-10 min-h-screen bg-[#070a14] text-white">
      <BackgroundFX />

      <AnimatePresence>
        {boot ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#060814]"
          >
            <motion.div
              initial={{ y: 10, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -6, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="w-[min(560px,calc(100%-40px))] rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-indigo-400/10 to-fuchsia-400/20 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black/40">
                    <Terminal className="h-5 w-5 text-white/85" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Initializing Secure Environment</div>
                  <div className="text-xs text-white/60">Loading portfolio modules…</div>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm text-white/70 font-mono">
                <div>✔ Checking dependencies… OK</div>
                <div>✔ Starting HUD… OK</div>
                <div>✔ Mounting quests… OK</div>
                <div>✔ Systems online.</div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400/90 via-indigo-400/90 to-fuchsia-400/90"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(980px,calc(100%-32px))] items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-indigo-400/10 to-fuchsia-400/20 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black/40">
                  <Shield className="h-5 w-5 text-white/85" />
                </div>
              </div>
              <motion.div
                className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{profile.name}</div>
              <div className="text-xs text-white/60">{profile.title}</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Chip icon={Map} text={profile.location} />
            <Chip icon={Sparkles} text="Fresh Graduate" />
          </div>

          <div className="flex items-center gap-2">
            <a
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              href={profile.links.email}
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              className="hidden items-center gap-2 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-400/15 hover:shadow-[0_0_35px_rgba(34,211,238,0.20)] sm:inline-flex"
              href={profile.links.cv}
              target="_blank"
              rel="noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>

        <div className="h-1 w-full bg-white/5">
          <motion.div
            style={{ scaleX: prog, transformOrigin: "0% 50%" }}
            className="h-full bg-gradient-to-r from-cyan-400/90 via-indigo-400/90 to-fuchsia-400/90"
          />
        </div>
      </div>

      <AnimatePresence>
        {navFx ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] pointer-events-none"
          >
            <motion.div
              initial={{ x: "-110%" }}
              animate={{ x: "110%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-cyan-500/0 via-cyan-500/18 to-fuchsia-500/0 blur-xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(340px_220px_at_50%_50%,#000_35%,transparent_75%)] bg-black/40" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.main
        animate={
          shake
            ? { x: [0, -6, 6, -3, 3, 0], y: [0, 2, -2, 1, -1, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.22 }}
        className="mx-auto w-[min(980px,calc(100%-32px))] pb-28 pt-6"
      >
        <section id="home" ref={refs.current.home} className="scroll-mt-28 py-10">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.95fr]">
            <div className="space-y-5">
              <HeroIntroCard image={userPhoto} />

              <motion.div
                onMouseMove={par.onMove}
                onMouseLeave={par.onLeave}
                style={{ rotateX: par.rotX, rotateY: par.rotY, transformStyle: "preserve-3d" }}
                className="relative"
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[28px]"
                  style={{
                    background:
                      "radial-gradient(220px 180px at var(--gx) var(--gy), rgba(34,211,238,0.20), transparent 70%), radial-gradient(220px 180px at calc(var(--gx) + 220px) calc(var(--gy) + 110px), rgba(217,70,239,0.15), transparent 72%)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    "--gx": par.glowX,
                    "--gy": par.glowY,
                  }}
                />
                <Card className="p-7">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        <Sparkles className="h-4 w-4" />
                        Portfolio
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                        <BadgeCheck className="h-4 w-4" />
                        Open to opportunities
                      </span>
                    </div>

                    <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                      Cybersecurity • Digital Forensics
                      <br />
                      • Threat Detection
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                      Master&apos;s track in Digital Forensics & Cybersecurity. I build secure systems, analyze
                      threats, and research ML-based detection (WSN virtual jamming).
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Chip icon={Shield} text="Secure Web / WAF" />
                      <Chip icon={Radar} text="ML-based Detection" />
                      <Chip icon={Terminal} text="Python + Data" />
                      <Chip icon={GraduationCap} text="Forensics Track" />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <ProgressBar label="Threat Detection XP" value={84} />
                      <ProgressBar label="Secure Development XP" value={78} />
                      <ProgressBar label="Forensics XP" value={72} />
                      <ProgressBar label="Research & Writing XP" value={80} />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        onClick={() => jumpTo("quests")}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                      >
                        View Quests (Projects)
                      </button>
                      <button
                        onClick={() => jumpTo("resume")}
                        className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/15"
                      >
                        Open Resume Sheet
                      </button>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <Stat key={s.label} label={s.label} value={s.value} icon={s.icon} />
                ))}
              </div>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/60">Current Mission</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Build a standout cybersecurity profile
                    </div>
                  </div>
                  <Trophy className="h-5 w-5 text-white/70" />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Portfolio Website</div>
                      <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[10px] text-amber-200">
                        In Progress
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/60">
                      Game UI + animations.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Add Details</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                        Next
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/60">
                      Make it look good.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <SceneSection
          id="quests"
          innerRef={refs.current.quests}
          title="Quests"
          subtitle="Projects as missions, click to open quest details."
          icon={Swords}
        >
          <motion.div variants={{ hidden: {}, show: {} }} className="grid gap-3 md:grid-cols-2">
            {quests.map((q) => (
              <motion.div
                key={q.title}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <button onClick={() => openQuest(q)} className="w-full text-left">
                  <Quest
                    title={q.title}
                    desc={q.desc}
                    tags={q.tags}
                    level={q.level}
                    status={q.status}
                    icon={q.icon}
                  />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </SceneSection>

        <SceneSection
          id="skills"
          innerRef={refs.current.skills}
          title="Inventory"
          subtitle="Skills and tools in the loadout."
          icon={Layers}
        >
          <motion.div className="grid gap-3 md:grid-cols-2">
            {skills.map((s) => (
              <motion.div
                key={s.name}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <InventorySkill name={s.name} desc={s.desc} icon={s.icon} stars={s.stars} />
              </motion.div>
            ))}
          </motion.div>
        </SceneSection>

        <SceneSection
          id="timeline"
          innerRef={refs.current.timeline}
          title="Timeline"
          subtitle="Campaign map."
          icon={Activity}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card>
              <div className="grid gap-3">
                {timeline.map((t) => (
                  <div key={t.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs text-white/60">{t.year}</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                        Checkpoint
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">{t.title}</div>
                    <div className="mt-1 text-sm text-white/60">{t.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </SceneSection>

        <SceneSection
          id="achievements"
          innerRef={refs.current.achievements}
          title="Achievements"
          subtitle="Awards & credentials"
          icon={Trophy}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {achievements.map((a) => (
              <motion.div
                key={a.title}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                      <a.icon className="h-5 w-5 text-white/80" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{a.title}</div>
                      <div className="mt-1 text-xs text-white/55">{a.meta}</div>
                      <div className="mt-2 text-sm text-white/60">{a.desc}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </SceneSection>

        <SceneSection
          id="resume"
          innerRef={refs.current.resume}
          title="Resume Sheet"
          subtitle="Character summary."
          icon={BookOpen}
        >
          <div className="grid gap-3 lg:grid-cols-2">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/60">Experience</div>
                    <div className="mt-1 text-sm font-semibold">Roles & impact</div>
                  </div>
                  <Briefcase className="h-5 w-5 text-white/70" />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Graduate Researcher (Cybersecurity)</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                        2023–2025
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                      <li>Designed simulation experiments and processed large trace logs for attack detection analysis.</li>
                      <li>Built ML pipelines (feature extraction → training → evaluation) and documented results.</li>
                      <li>Presented research project in Alkhobar, Saudi Arabia (international academic event).</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Web Security Project (WAF), Laravel</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                        2025
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                      <li>Implemented WAF controls, filtering, and mitigation logic to reduce attack surface.</li>
                      <li>Improved logging/observability for security reviews and debugging.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Internship, PT Telkom Akses Makassar</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                        2019
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                      <li>Supported access network / FTTH planning and technical operations documentation.</li>
                      <li>Earned strong performance evaluation (9.33).</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <div className="grid gap-3">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/60">Education</div>
                      <div className="mt-1 text-sm font-semibold">Academic path</div>
                    </div>
                    <GraduationCap className="h-5 w-5 text-white/70" />
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Telkom University, B.Comp.Sc</div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                          2020–2024
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-white/60">
                        Computer Science • Security-oriented projects
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Telkom University, M.Sc Track</div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                          2023–2025
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-white/60">
                        Forensic Science (Digital Forensics & Cybersecurity)
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/60">Certifications</div>
                      <div className="mt-1 text-sm font-semibold">Proof of capability</div>
                    </div>
                    <BadgeCheck className="h-5 w-5 text-white/70" />
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      "Cisco Networking Academy, Networking Essentials (2019)",
                      "TOEFL ITP 557 (2023)",
                      "Industrial Internship Certificate, PT Telkom Akses (2019)",
                    ].map((c) => (
                      <div
                        key={c}
                        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/65"
                      >
                        <CheckCircle2 className="h-4 w-4 text-white/60" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/60">Contact</div>
                      <div className="mt-1 text-sm font-semibold">Let’s connect</div>
                    </div>
                    <Mail className="h-5 w-5 text-white/70" />
                  </div>

                  <div className="mt-4 grid gap-2">
                    <a
                      href={profile.links.email}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail className="h-4 w-4" /> Email
                      </div>
                      <span className="text-xs text-white/45">Reply within 24h</span>
                    </a>

                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </div>
                      <span className="text-xs text-white/45">DM open</span>
                    </a>

                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Github className="h-4 w-4" /> GitHub
                      </div>
                      <span className="text-xs text-white/45">Pinned repos</span>
                    </a>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-white/45">
            Built with React + Framer Motion
          </div>
        </SceneSection>
      </motion.main>

      <AnimatePresence>
        {xpToast ? (
          <motion.div
            key={xpToast.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="fixed right-6 top-24 z-[60] rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.18)] backdrop-blur"
          >
            {xpToast.text}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Nav active={active} onJump={jumpTo} />

      <Modal open={!!openProject} title={openProject ? openProject.title : ""} onClose={() => setOpenProject(null)}>
        {openProject?.links?.paper ? (
          <div className="flex flex-wrap gap-2">
            <a
              href={openProject.links.paper}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-400/15 hover:shadow-[0_0_35px_rgba(34,211,238,0.20)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View IEEE Paper
            </a>
          </div>
        ) : null}

        {openProject ? (
          <div className="mt-4 space-y-7">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                  {openProject.level}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                  {openProject.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{openProject.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {openProject.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Quest Highlights</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
                  {openProject.details.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Tech Stack</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {openProject.details.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-white/60">Outcome</div>
                <div className="mt-1 text-sm text-white/65">{openProject.details.outcome}</div>
              </div>
            </div>

            {openProject?.screenshots?.length > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <ImageIcon className="h-4 w-4" />
                  Project Screenshots
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {openProject.screenshots.map((shot, index) => (
                    <button
                      key={`${shot.label}-${index}`}
                      type="button"
                      onClick={() => openScreenshot(shot.src, `${openProject.title} - ${shot.label}`)}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition hover:scale-[1.02] hover:border-cyan-400/25 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                    >
                      <img
                        src={shot.src}
                        alt={`${openProject.title} screenshot ${index + 1}`}
                        className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <span className="truncate text-[11px] text-white/65">{shot.label}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-white/40" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-white/45">
                Screenshots have not been added for this project yet.
              </div>
            )}
          </div>
        ) : null}
      </Modal>

      <Lightbox
        open={!!previewImage}
        image={previewImage}
        title={previewTitle}
        onClose={() => {
          setPreviewImage(null);
          setPreviewTitle("");
        }}
      />
    </div>
  );
}

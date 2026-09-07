"use client";

import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaChartLine,
} from "react-icons/fa";

const roles = [
  {
    icon: FaCode,
    title: "Fullstack Developer",
    status: "Primary Focus",
    description: "Building complete web experiences.",
  },
  {
    icon: FaLaptopCode,
    title: "Frontend Developer",
    status: "Open To",
    description: "Creating interactive interfaces.",
  },
  {
    icon: FaServer,
    title: "Backend Developer",
    status: "Open To",
    description: "Designing reliable backend systems.",
  },
  {
    icon: FaChartLine,
    title: "Data Analyst",
    status: "Exploring",
    description: "Exploring data and AI.",
  },
];

export default function LookingForVisual() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => {
          const Icon = role.icon;

          return (
            <div
              key={role.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/40 hover:bg-white/[0.05]"
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#A855F7]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#C084FC]">
                  <Icon size={17} />
                </div>

                <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#A855F7]">
                  {role.status}
                </p>

                <h3 className="text-sm font-semibold text-white md:text-base">
                  {role.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  {role.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
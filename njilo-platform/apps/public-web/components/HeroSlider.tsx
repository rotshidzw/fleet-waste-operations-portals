"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    title: "Integrated Fleet & Waste Solutions",
    description: "Enterprise-grade fleet, waste, and compliance operations with measurable outcomes.",
    image: "/media/stock/hero-1.svg"
  },
  {
    title: "Operational Resilience at Scale",
    description: "Predictable cost structures and service continuity across regions.",
    image: "/media/stock/hero-2.svg"
  },
  {
    title: "Compliance, Insight, Control",
    description: "Live reporting, governance workflows, and executive dashboards.",
    image: "/media/stock/hero-3.svg"
  }
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-blue-900 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 p-12 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">Enterprise Platform</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight lg:text-5xl">{slide.title}</h1>
            <p className="mt-4 text-lg text-slate-200">{slide.description}</p>
            <div className="mt-8 flex gap-4">
              <button className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white">Request a Quote</button>
              <button className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white">Explore Services</button>
            </div>
          </div>
          <div className="relative min-h-[260px]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 right-8 flex gap-2">
        {slides.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActive(index)}
            className={`h-2 w-10 rounded-full ${index === active ? "bg-orange-400" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Njilo delivered immediate visibility across fleet KPIs and reduced our downtime by 28% within one quarter.",
    name: "Lerato Mokoena",
    title: "COO, Metro Utilities"
  },
  {
    quote:
      "The waste operations team brought compliance discipline and real-time reporting that our auditors loved.",
    name: "Matthew Pillay",
    title: "Head of Risk, Civic Logistics"
  },
  {
    quote:
      "From plant rentals to telematics, the service was consistent and enterprise-ready across all regions.",
    name: "Anika van der Merwe",
    title: "Operations Director, HarborTech"
  }
];

export function TestimonialsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
        Client voices
      </p>
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[active].quote}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg font-medium text-slate-900 dark:text-white">“{testimonials[active].quote}”</p>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">{testimonials[active].name}</p>
              <p>{testimonials[active].title}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex gap-2">
        {testimonials.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActive(index)}
            className={`h-2 w-8 rounded-full ${
              index === active ? "bg-orange-500" : "bg-slate-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

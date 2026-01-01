"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[var(--page-bg)] font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-5xl mb-4 font-bold text-[var(--text-primary)] max-w-4xl">
          Founder&apos;s Journey
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
          A path shaped by experience, purpose, and the vision to bring quality fresh food to every Indian family.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            // === THE INTERSECTION LOGIC ===
            initial="inactive"
            whileInView="active"
            viewport={{ 
              once: false, 
              // This creates a "laser line" in the exact center of the screen
              // The animation triggers ONLY when the element crosses this line
              margin: "-50% 0px -50% 0px" 
            }}
          >
            {/* Sticky Title (Desktop) & Dot */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              
              {/* The Dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[var(--page-bg)] flex items-center justify-center z-50">
                <motion.div
                  variants={{
                    inactive: { scale: 0.8, backgroundColor: "#3f3f46" }, // Gray (neutral-700)
                    active: { 
                      scale: 1.3, 
                      backgroundColor: "#22c55e", // Bright Green
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)" // Green Glow
                    }
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-4 w-4 rounded-full border-2 border-white"
                />
              </div>
              
              {/* THE HEADING (Darkens when active) */}
              <motion.h3 
                variants={{
                  inactive: { 
                    opacity: 0.3, 
                    color: "#9ca3af", // gray-400
                    scale: 0.95 
                  },
                  active: { 
                    opacity: 1, 
                    color: "#064e3b", // Deep Green (or Black)
                    scale: 1
                  }
                }}
                transition={{ duration: 0.4 }}
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold"
              >
                {item.title}
              </motion.h3>
            </div>

            {/* THE CONTENT CARD (Zooms & Highlights) */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <motion.div
                variants={{
                  inactive: { 
                    opacity: 0.5, 
                    y: 20, 
                    scale: 0.9,
                    filter: "grayscale(100%)" // Optional: makes inactive cards B&W
                  },
                  active: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    filter: "grayscale(0%)"
                  }
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="w-full"
              >
                {/* Mobile Title */}
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[#064e3b]">
                  {item.title}
                </h3>
                
                {/* THE CARD */}
                <motion.div 
                  variants={{
                    inactive: { 
                      boxShadow: "0 0 0 rgba(0,0,0,0)",
                      borderColor: "rgba(226, 232, 240, 0.5)" // slate-200 faded
                    },
                    active: { 
                      // Simulates a "Hover" state but triggered by scroll
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                      borderColor: "rgba(34, 197, 94, 0.5)" // Green border highlight
                    }
                  }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 border hover:shadow-xl transition-all duration-300"
                >
                   {/* Content */}
                   <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                     {item.content}
                   </div>
                </motion.div>

              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* The Progress Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#064e3b] via-[#22c55e] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
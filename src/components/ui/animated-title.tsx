"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animationType?: "typing" | "handwriting" | "letter";
  duration?: number;
  delay?: number;
}

export function AnimatedTitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  animationType = "letter",
  duration = 0.5,
  delay = 0.1,
}: AnimatedTitleProps) {
  const letters = Array.from(title);

  // Letter animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: i * delay,
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  // Handwriting animation variants
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
        opacity: { duration: 0.5 },
      },
    },
  };

  // Typing animation
  if (animationType === "typing") {
    return (
      <div className={cn("relative w-full max-w-4xl mx-auto py-12", className)}>
        <TypingAnimation
          text={title}
          className={cn(
            "text-4xl md:text-6xl font-bold text-artist-black tracking-tighter",
            titleClassName
          )}
        />
        {subtitle && (
          <motion.p
            className={cn(
              "text-xl text-artist-gray text-center mt-4",
              subtitleClassName
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  // Handwriting animation
  if (animationType === "handwriting") {
    return (
      <div className={cn("relative w-full max-w-4xl mx-auto py-24", className)}>
        <div className="absolute inset-0">
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 600"
            initial="hidden"
            animate="visible"
            className="w-full h-full"
          >
            <motion.path
              d="M 950 90 
                 C 1250 300, 1050 480, 600 520
                 C 250 520, 150 480, 150 300
                 C 150 120, 350 80, 600 80
                 C 850 80, 950 180, 950 180"
              fill="none"
              strokeWidth="12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={draw}
              className="text-artist-accent opacity-90"
            />
          </motion.svg>
        </div>
        <div className="relative text-center z-10 flex flex-col items-center justify-center">
          <motion.h1
            className={cn(
              "text-4xl md:text-6xl text-artist-black tracking-tighter flex items-center gap-2",
              titleClassName
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className={cn(
                "text-xl text-artist-gray",
                subtitleClassName
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  // Letter-by-letter animation (default)
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-12 w-full",
        className
      )}
    >
      <div className="relative w-full">
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", overflow: "visible" }}
          variants={container}
          initial="hidden"
          animate="visible"
          className={cn(
            "text-4xl md:text-6xl font-bold text-center text-artist-black w-full",
            titleClassName
          )}
        >
          {letters.map((letter, index) => (
            <motion.span key={index} variants={child}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ width: "0%", left: "50%" }}
          animate={{
            width: "100%",
            left: "0%",
            transition: {
              delay: letters.length * delay,
              duration: 0.8,
              ease: "easeOut",
            },
          }}
          className="absolute h-1 -bottom-2 bg-gradient-to-r from-artist-accent/50 via-artist-accent to-artist-accent/50"
        />
      </div>
      {subtitle && (
        <motion.p
          className={cn(
            "text-xl text-artist-gray text-center mt-4",
            subtitleClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: letters.length * delay + 0.5, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// Helper component for typing animation
function TypingAnimation({
  text,
  duration = 200,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = React.useState<string>("");
  const [i, setI] = React.useState<number>(0);

  React.useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text]);

  return (
    <h1
      className={cn(
        "font-serif text-center text-4xl font-bold leading-tight tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {displayedText ? displayedText : text}
    </h1>
  );
} 
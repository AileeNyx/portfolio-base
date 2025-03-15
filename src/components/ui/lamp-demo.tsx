"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function LampDemo() {
  return (
    <LampContainer className="min-h-[35vh] pt-10">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-white to-artist-accent py-4 bg-clip-text text-center text-4xl font-serif font-bold tracking-tight text-transparent md:text-7xl"
      >
        Collection d'œuvres
      </motion.h1>
    </LampContainer>
  );
} 
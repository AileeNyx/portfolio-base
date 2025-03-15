"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScrollSecond = ({
  images,
  className,
  onImageClick,
}: {
  images: string[];
  className?: string;
  onImageClick?: (image: string) => void;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // Fonction pour gérer le clic sur une image
  const handleImageClick = (image: string) => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateZ: rotateXFirst,
              }}
              key={"grid-1" + idx}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleImageClick(el)}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 transition-transform duration-500 group-hover:scale-110"
                height="400"
                width="400"
                alt="artwork thumbnail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs">Cliquez pour voir les détails</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div 
              key={"grid-2" + idx}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleImageClick(el)}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 transition-transform duration-500 group-hover:scale-110"
                height="400"
                width="400"
                alt="artwork thumbnail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs">Cliquez pour voir les détails</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateZ: rotateXThird,
              }}
              key={"grid-3" + idx}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleImageClick(el)}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 transition-transform duration-500 group-hover:scale-110"
                height="400"
                width="400"
                alt="artwork thumbnail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs">Cliquez pour voir les détails</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 
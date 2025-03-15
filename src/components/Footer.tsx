'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-md text-white py-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            With &lt;3, AileeNyx's Portfolio
          </p>
          <div className="flex space-x-6 text-sm text-white/60">
            Forked from&nbsp;<a href="https://github.com/Utolol22/portfolio-artiste" target="_blank">@Wonderful.Gemini</a>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
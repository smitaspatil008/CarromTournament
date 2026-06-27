import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Layout({ children, fullWidth, noPadding }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`flex-1 ${noPadding ? '' : 'py-6 sm:py-8'}`}
      >
        <div className={fullWidth ? '' : 'max-w-7xl mx-auto px-4 sm:px-6'}>
          {children}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

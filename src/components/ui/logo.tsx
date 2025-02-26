import { motion } from 'framer-motion';

export const Logo = () => {
  return (
    <motion.div
      className="relative select-none text-2xl font-bold"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <span className="relative block">
        <span className="absolute inset-0 rotate-[2deg] transform bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent blur-[0.5px]">
          PARASCAPE
        </span>
        <span className="relative bg-gradient-to-br from-emerald-400 via-parascape-green to-emerald-800 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          PARASCAPE
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent mix-blend-overlay" />
      </span>
    </motion.div>
  );
};

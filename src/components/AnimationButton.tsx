// Subtila animering som används för mata och klappa knappen i CareStatus.tsx

import { motion } from "framer-motion";

interface Props {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string; 
}

export const AnimationButton = ({ onClick, children, disabled, className }: Props) => (
    <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`${className ?? ""} p-2 rounded transition-colors duration-200`}
    whileHover={{
      scale: 1.15, 
      boxShadow: "0px 4px 15px rgba(0,0,0,0.2)", 
    }}
    whileTap={{
      scale: 0.9,  
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
    }}
    transition={{ type: "spring", stiffness: 250, damping: 20 }}
  >
    {children}
  </motion.button>
);

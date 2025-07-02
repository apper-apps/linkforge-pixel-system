import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`glass rounded-xl p-6 transition-all duration-200 ${hover ? 'hover:shadow-lg hover:shadow-primary/10' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
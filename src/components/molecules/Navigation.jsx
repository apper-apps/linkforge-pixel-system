import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Navigation = ({ mobile = false, onItemClick }) => {
  const navItems = [
    { path: '/create', label: 'Create', icon: 'Plus' },
    { path: '/my-links', label: 'My Links', icon: 'Link' },
    { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
    { path: '/settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleItemClick = () => {
    if (onItemClick) onItemClick();
  };

  return (
    <nav className={mobile ? 'space-y-2' : 'flex space-x-1'}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={handleItemClick}
          className={({ isActive }) =>
            `flex items-center ${mobile ? 'px-4 py-3' : 'px-4 py-2'} rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-primary to-accent text-white'
                : 'text-gray-300 hover:text-white hover:bg-surface'
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <ApperIcon 
                name={item.icon} 
                className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} 
              />
              <span>{item.label}</span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
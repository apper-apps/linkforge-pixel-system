import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import ApperIcon from '@/components/ApperIcon';
import Navigation from '@/components/molecules/Navigation';
import Button from '@/components/atoms/Button';
import { AuthContext } from '@/App';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Link" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-display font-bold gradient-text">
              LinkForge
            </h1>
          </div>

{/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Navigation />
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  {user?.firstName} {user?.lastName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="LogOut" className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface transition-colors"
            >
              <ApperIcon 
                name={mobileMenuOpen ? "X" : "Menu"} 
                className="h-6 w-6" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800 bg-background"
          >
<div className="px-4 py-4 space-y-2">
              <Navigation mobile onItemClick={closeMobileMenu} />
              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="flex items-center space-x-2"
                    >
                      <ApperIcon name="LogOut" className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
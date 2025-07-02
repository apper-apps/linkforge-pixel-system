import { useState } from 'react';
import { motion } from 'framer-motion';
import LinkCreator from '@/components/organisms/LinkCreator';
import BulkUrlShortener from '@/components/organisms/BulkUrlShortener';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const CreatePage = () => {
  const [activeTab, setActiveTab] = useState('single');

  const tabs = [
    { id: 'single', label: 'Single URL', icon: 'Link' },
    { id: 'bulk', label: 'Bulk URLs', icon: 'Layers' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-white">
          Create <span className="gradient-text">Short Links</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Transform your long URLs into powerful, trackable short links in seconds
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="bg-surface/50 rounded-lg p-1 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-surface/50'
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'single' && <LinkCreator />}
        {activeTab === 'bulk' && <BulkUrlShortener />}
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-800"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto">
            <ApperIcon name="Zap" className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
          <p className="text-gray-400">
            Generate shortened URLs instantly with our optimized infrastructure
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mx-auto">
            <ApperIcon name="BarChart3" className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-white">Detailed Analytics</h3>
          <p className="text-gray-400">
            Track clicks, monitor performance, and understand your audience
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center mx-auto">
            <ApperIcon name="Shield" className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-white">Secure & Reliable</h3>
          <p className="text-gray-400">
            99.9% uptime with enterprise-grade security for all your links
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePage;
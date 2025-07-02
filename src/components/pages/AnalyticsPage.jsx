import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnalyticsOverview from '@/components/organisms/AnalyticsOverview';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import linkService from '@/services/api/linkService';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const links = await linkService.getAll();
      setData(links);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  // Generate mock chart data for demonstration
  const generateChartData = () => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    return days.map(day => ({
      date: format(day, 'MMM dd'),
      clicks: Math.floor(Math.random() * 100) + 20
    }));
  };

  const chartData = generateChartData();
  const totalLinks = data.length;
  const totalClicks = data.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = data.filter(link => link.isActive).length;
  const clickThroughRate = totalLinks > 0 ? ((totalClicks / totalLinks) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Track performance and insights for all your links
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeRange === range.value
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-surface'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Analytics Overview */}
      <AnalyticsOverview />

      {/* Additional Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Click Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Click Trends</h3>
              <ApperIcon name="TrendingUp" className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 text-sm text-gray-400">{item.date}</div>
                  <div className="flex-1 bg-surface/50 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.clicks / 120) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                  <div className="w-12 text-sm text-white text-right">{item.clicks}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center space-x-2 mb-6">
              <ApperIcon name="Target" className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold text-white">Performance Metrics</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400">Click-Through Rate</p>
                  <p className="text-2xl font-bold text-white">{clickThroughRate}%</p>
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="MousePointer" className="h-6 w-6 text-accent" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400">Active Links</p>
                  <p className="text-2xl font-bold text-white">{activeLinks}</p>
                </div>
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Activity" className="h-6 w-6 text-success" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400">Avg Clicks per Link</p>
                  <p className="text-2xl font-bold text-white">
                    {totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="BarChart3" className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <div className="flex items-center space-x-2 mb-6">
            <ApperIcon name="Clock" className="h-5 w-5 text-info" />
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            {data.slice(0, 5).map((link, index) => (
              <motion.div
                key={link.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-surface/30 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Link" className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white truncate max-w-xs">
                      {link.customAlias || link.shortCode}
                    </p>
                    <p className="text-sm text-gray-400 truncate max-w-xs">
                      {link.originalUrl}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{link.clicks}</p>
                  <p className="text-xs text-gray-400">clicks</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
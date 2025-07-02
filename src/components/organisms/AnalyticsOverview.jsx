import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import linkService from '@/services/api/linkService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const AnalyticsOverview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnalytics = async () => {
    try {
      setError('');
      setLoading(true);
      const links = await linkService.getAll();
      setData(links);
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAnalytics} />;

  const totalLinks = data.length;
  const totalClicks = data.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = data.filter(link => link.isActive).length;
  const avgClicksPerLink = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;

  const stats = [
    {
      label: 'Total Links',
      value: totalLinks,
      icon: 'Link',
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    },
    {
      label: 'Total Clicks',
      value: totalClicks.toLocaleString(),
      icon: 'MousePointer',
      color: 'text-accent',
      bgColor: 'bg-accent/20'
    },
    {
      label: 'Active Links',
      value: activeLinks,
      icon: 'Activity',
      color: 'text-success',
      bgColor: 'bg-success/20'
    },
    {
      label: 'Avg Clicks/Link',
      value: avgClicksPerLink,
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20'
    }
  ];

  const topPerformers = data
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover={false}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Performers */}
      {topPerformers.length > 0 && (
        <Card>
          <div className="flex items-center space-x-2 mb-6">
            <ApperIcon name="Trophy" className="h-5 w-5 text-warning" />
            <h3 className="text-xl font-semibold text-white">Top Performing Links</h3>
          </div>
          <div className="space-y-4">
            {topPerformers.map((link, index) => (
              <motion.div
                key={link.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-surface/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-warning text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-surface text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white truncate">
                      {link.customAlias || link.shortCode}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {link.originalUrl}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-white">{link.clicks}</p>
                    <p className="text-xs text-gray-400">clicks</p>
                  </div>
                  <ApperIcon name="ExternalLink" className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsOverview;
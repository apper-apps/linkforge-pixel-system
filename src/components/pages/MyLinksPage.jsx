import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import LinkCard from "@/components/organisms/LinkCard";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import linkService from "@/services/api/linkService";

const MyLinksPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

const loadLinks = async () => {
    try {
      setError('');
      setLoading(true);
      const links = await linkService.getAll();
      setData(links);
    } catch (err) {
      setError(err.message || 'Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

const handleDelete = async (linkId) => {
    try {
      await linkService.delete(linkId);
      setData(prev => prev.filter(link => link.Id !== linkId));
    } catch (err) {
      console.error('Failed to delete link:', err);
    }
  };

const handleUpdate = async (linkId, updatedData) => {
    try {
      const updatedLink = await linkService.update(linkId, updatedData);
      setData(prev => prev.map(link => 
        link.Id === linkId ? updatedLink : link
      ));
    } catch (err) {
      console.error('Failed to update link:', err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadLinks} />;

  // Filter and sort links
  const filteredData = data.filter(link => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      link.originalUrl.toLowerCase().includes(searchLower) ||
      link.shortCode.toLowerCase().includes(searchLower) ||
      (link.customAlias && link.customAlias.toLowerCase().includes(searchLower))
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'mostClicks':
        return b.clicks - a.clicks;
      case 'leastClicks':
        return a.clicks - b.clicks;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (data.length === 0) {
    return (
      <Empty
        icon="Link"
        title="No links created yet"
        description="Start by creating your first shortened link to see it here"
        actionText="Create Your First Link"
        onAction={() => navigate('/create')}
      />
    );
  }

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
            My Links
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and track all your shortened links
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/create')}
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Create New Link
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-6"
      >
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Link" className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{data.length}</p>
              <p className="text-sm text-gray-400">Total Links</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="MousePointer" className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {data.reduce((sum, link) => sum + link.clicks, 0)}
              </p>
              <p className="text-sm text-gray-400">Total Clicks</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Activity" className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {data.filter(link => link.isActive).length}
              </p>
              <p className="text-sm text-gray-400">Active Links</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {data.length > 0 ? Math.round(data.reduce((sum, link) => sum + link.clicks, 0) / data.length) : 0}
              </p>
              <p className="text-sm text-gray-400">Avg Clicks</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search links by URL or alias..."
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostClicks">Most Clicks</option>
            <option value="leastClicks">Least Clicks</option>
          </select>
        </div>
      </motion.div>

      {/* Links Grid */}
      {filteredData.length === 0 ? (
        <Empty
          icon="Search"
          title="No matching links found"
          description={`No links match your search for "${searchTerm}"`}
          actionText="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {sortedData.map((link) => (
              <LinkCard
                key={link.Id}
                link={link}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default MyLinksPage;
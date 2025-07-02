import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import Card from '@/components/atoms/Card';
import linkService from '@/services/api/linkService';

const LinkCreator = ({ onLinkCreated }) => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customAlias: ''
  });
  const [loading, setLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.originalUrl.trim()) {
      toast.error('Please enter a URL to shorten');
      return;
    }

    if (!isValidUrl(formData.originalUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const newLink = await linkService.create({
        originalUrl: formData.originalUrl,
        customAlias: formData.customAlias || undefined
      });
      
      setCreatedLink(newLink);
      toast.success('Link shortened successfully!');
      
      if (onLinkCreated) {
        onLinkCreated(newLink);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!createdLink) return;
    
    try {
      await navigator.clipboard.writeText(`https://lnk.fge/${createdLink.shortCode}`);
      setCopySuccess(true);
      toast.success('Link copied to clipboard!');
      
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleCreateAnother = () => {
    setCreatedLink(null);
    setFormData({ originalUrl: '', customAlias: '' });
    setCopySuccess(false);
  };

  if (createdLink) {
    return (
      <Card className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Check" className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Link Created Successfully!
            </h3>
            <p className="text-gray-400">
              Your shortened link is ready to share
            </p>
          </div>

          <div className="bg-surface/50 rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Link
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-background rounded-lg px-4 py-3 font-mono text-primary">
                  https://lnk.fge/{createdLink.shortCode}
                </div>
                <Button
                  variant={copySuccess ? 'secondary' : 'primary'}
                  onClick={handleCopy}
                  className="px-4"
                >
                  <ApperIcon 
                    name={copySuccess ? "Check" : "Copy"} 
                    className="h-4 w-4" 
                  />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Original URL
              </label>
              <div className="bg-background rounded-lg px-4 py-3 text-gray-400 truncate">
                {createdLink.originalUrl}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="primary"
              onClick={handleCreateAnother}
              className="flex-1"
            >
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              Create Another Link
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`/analytics/${createdLink.shortCode}`, '_blank')}
              className="flex-1"
            >
              <ApperIcon name="BarChart3" className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          Shorten Your Links
        </h2>
        <p className="text-gray-400">
          Transform long URLs into short, shareable links with analytics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="URL to Shorten"
          id="originalUrl"
          type="url"
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          value={formData.originalUrl}
          onChange={(e) => handleInputChange('originalUrl', e.target.value)}
          required
        />

        <FormField
          label="Custom Alias (Optional)"
          id="customAlias"
          type="text"
          placeholder="my-custom-link"
          value={formData.customAlias}
          onChange={(e) => handleInputChange('customAlias', e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          <ApperIcon name="Zap" className="h-5 w-5 mr-2" />
          Shorten URL
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Zap" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white">Instant</h3>
            <p className="text-sm text-gray-400">Generate links in seconds</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="BarChart3" className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-white">Analytics</h3>
            <p className="text-sm text-gray-400">Track clicks and performance</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Shield" className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-white">Reliable</h3>
            <p className="text-sm text-gray-400">99.9% uptime guarantee</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LinkCreator;
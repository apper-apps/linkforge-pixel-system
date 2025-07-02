import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import linkService from '@/services/api/linkService';

const BulkUrlShortener = ({ onLinksCreated }) => {
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url.trim());
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!urls.trim()) {
      toast.error('Please enter URLs to shorten');
      return;
    }

    const urlList = urls.split('\n').filter(url => url.trim());
    
    if (urlList.length === 0) {
      toast.error('Please enter valid URLs');
      return;
    }

    const invalidUrls = urlList.filter(url => !isValidUrl(url));
    if (invalidUrls.length > 0) {
      toast.error(`Invalid URLs found: ${invalidUrls.slice(0, 3).join(', ')}${invalidUrls.length > 3 ? '...' : ''}`);
      return;
    }

    setLoading(true);
    const processedResults = [];

    try {
      for (const url of urlList) {
        try {
          const link = await linkService.create({ originalUrl: url.trim() });
          processedResults.push({
            originalUrl: url.trim(),
            shortUrl: `https://lnk.fge/${link.shortCode}`,
            status: 'success',
            link
          });
        } catch (error) {
          processedResults.push({
            originalUrl: url.trim(),
            error: error.message,
            status: 'error'
          });
        }
      }

      setResults(processedResults);
      setShowResults(true);
      
      const successCount = processedResults.filter(r => r.status === 'success').length;
      const errorCount = processedResults.filter(r => r.status === 'error').length;
      
      if (successCount > 0) {
        toast.success(`${successCount} URLs shortened successfully!`);
        if (onLinksCreated) {
          onLinksCreated(processedResults.filter(r => r.status === 'success').map(r => r.link));
        }
      }
      
      if (errorCount > 0) {
        toast.warning(`${errorCount} URLs failed to process`);
      }
      
    } catch (error) {
      toast.error('Failed to process URLs');
    } finally {
      setLoading(false);
    }
  };

  const copyAllLinks = async () => {
    const successfulLinks = results
      .filter(r => r.status === 'success')
      .map(r => r.shortUrl)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(successfulLinks);
      toast.success('All links copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy links');
    }
  };

  const handleStartOver = () => {
    setUrls('');
    setResults([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                Bulk Shortening Results
              </h3>
              <p className="text-gray-400">
                {results.filter(r => r.status === 'success').length} of {results.length} URLs processed successfully
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={copyAllLinks}>
                <ApperIcon name="Copy" className="h-4 w-4 mr-2" />
                Copy All Links
              </Button>
              <Button variant="primary" onClick={handleStartOver}>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Shorten More
              </Button>
            </div>
          </div>

          <div className="bg-surface/50 rounded-lg max-h-96 overflow-y-auto">
            <div className="space-y-2 p-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.status === 'success' ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <ApperIcon 
                      name={result.status === 'success' ? 'Check' : 'X'} 
                      className={`h-4 w-4 ${result.status === 'success' ? 'text-success' : 'text-error'}`} 
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white truncate">{result.originalUrl}</p>
                      {result.status === 'success' ? (
                        <p className="text-xs text-primary font-mono">{result.shortUrl}</p>
                      ) : (
                        <p className="text-xs text-error">{result.error}</p>
                      )}
                    </div>
                  </div>
                  {result.status === 'success' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(result.shortUrl)}
                      className="p-2"
                    >
                      <ApperIcon name="Copy" className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          Bulk URL Shortener
        </h2>
        <p className="text-gray-400">
          Shorten multiple URLs at once - enter one URL per line
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            URLs to Shorten
          </label>
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder={`https://example.com/page1
https://example.com/page2  
https://example.com/page3`}
            rows={8}
            className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            required
          />
          <p className="text-xs text-gray-400 mt-2">
            Enter one URL per line. Up to 50 URLs can be processed at once.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          <ApperIcon name="Zap" className="h-5 w-5 mr-2" />
          Shorten All URLs
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Layers" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white">Batch Processing</h3>
            <p className="text-sm text-gray-400">Process up to 50 URLs at once</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="Download" className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-white">Export Results</h3>
            <p className="text-sm text-gray-400">Copy all shortened links easily</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BulkUrlShortener;
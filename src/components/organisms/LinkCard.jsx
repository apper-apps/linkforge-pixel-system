import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const LinkCard = ({ link, onDelete, onUpdate }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const shortUrl = `https://lnk.fge/${link.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess(true);
      toast.success('Link copied to clipboard!');
      
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleDelete = () => {
if (window.confirm('Are you sure you want to delete this link?')) {
      onDelete(link.Id);
      toast.success('Link deleted successfully');
    }
  };

const handleToggleStatus = () => {
    const updatedLink = { ...link, isActive: !link.isActive };
    onUpdate(link.Id, updatedLink);
    toast.success(`Link ${link.isActive ? 'disabled' : 'enabled'} successfully`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className={`transition-all duration-200 ${!link.isActive ? 'opacity-60' : ''}`}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
<h3 className="font-semibold text-white truncate">
                  {link.customAlias || link.shortCode}
                </h3>
                {!link.isActive && (
                  <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded-full">
                    Disabled
                  </span>
                )}
              </div>
<p className="text-sm text-gray-400 truncate">
                {link.originalUrl}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="p-2"
              >
                <ApperIcon 
                  name={copySuccess ? "Check" : "Copy"} 
                  className={`h-4 w-4 ${copySuccess ? 'text-success' : ''}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQR(!showQR)}
                className="p-2"
              >
                <ApperIcon name="QrCode" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Short URL */}
          <div className="bg-surface/50 rounded-lg p-3">
<div className="flex items-center justify-between">
              <span className="font-mono text-primary text-sm">
                {shortUrl}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="MousePointer" className="h-4 w-4" />
                  <span>{link.clicks}</span>
                </div>
                <div className="flex items-center space-x-1">
<div className="flex items-center space-x-1">
                  <span>{format(new Date(link.createdAt), 'MMM d')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-700 pt-4"
            >
              <div className="flex items-center justify-center bg-white rounded-lg p-4">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-xs text-center">
QR Code<br />
                    {link.shortCode}
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <Button variant="outline" size="sm">
                  <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                  Download QR
                </Button>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleStatus}
              >
<ApperIcon 
                  name={link.isActive ? "Pause" : "Play"} 
                  className="h-4 w-4 mr-2" 
                />
                {link.isActive ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
onClick={() => window.open(`/analytics/${link.shortCode}`, '_blank')}
              >
                <ApperIcon name="BarChart3" className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
</Card>
    </motion.div>
  );
};

export default LinkCard;
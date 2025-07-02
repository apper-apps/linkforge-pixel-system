import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import Card from '@/components/atoms/Card';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    defaultDomain: 'lnk.fge',
    customDomain: '',
    autoGenerateAlias: true,
    enableAnalytics: true,
    linkExpiration: 'never',
    clickLimit: '',
    passwordProtection: false,
    customBranding: false
  });

  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = () => {
    // Simulate data export
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkforge-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Settings exported successfully!');
  };

  const settingsSections = [
    {
      title: 'General Settings',
      icon: 'Settings',
      settings: [
        {
          key: 'defaultDomain',
          label: 'Default Domain',
          type: 'select',
          options: [
            { value: 'lnk.fge', label: 'lnk.fge' },
            { value: 'short.ly', label: 'short.ly' },
            { value: 'tiny.url', label: 'tiny.url' }
          ]
        },
        {
          key: 'customDomain',
          label: 'Custom Domain',
          type: 'text',
          placeholder: 'your-domain.com'
        },
        {
          key: 'autoGenerateAlias',
          label: 'Auto-generate Aliases',
          type: 'toggle',
          description: 'Automatically create short aliases for new links'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: 'Shield',
      settings: [
        {
          key: 'enableAnalytics',
          label: 'Enable Analytics',
          type: 'toggle',
          description: 'Collect click data and analytics for your links'
        },
        {
          key: 'passwordProtection',
          label: 'Password Protection',
          type: 'toggle',
          description: 'Allow password protection for sensitive links'
        }
      ]
    },
    {
      title: 'Link Behavior',
      icon: 'Link',
      settings: [
        {
          key: 'linkExpiration',
          label: 'Default Link Expiration',
          type: 'select',
          options: [
            { value: 'never', label: 'Never' },
            { value: '1d', label: '1 Day' },
            { value: '7d', label: '7 Days' },
            { value: '30d', label: '30 Days' },
            { value: '90d', label: '90 Days' },
            { value: '1y', label: '1 Year' }
          ]
        },
        {
          key: 'clickLimit',
          label: 'Default Click Limit',
          type: 'number',
          placeholder: 'Unlimited'
        }
      ]
    },
    {
      title: 'Customization',
      icon: 'Palette',
      settings: [
        {
          key: 'customBranding',
          label: 'Custom Branding',
          type: 'toggle',
          description: 'Add your logo and branding to link pages'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            Settings
          </h1>
          <p className="text-gray-400 mt-2">
            Customize your LinkForge experience
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleExportData}
          >
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            loading={saving}
          >
            <ApperIcon name="Save" className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name={section.icon} className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              
              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="space-y-2">
                    {setting.type === 'toggle' ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-white">
                            {setting.label}
                          </label>
                          {setting.description && (
                            <p className="text-xs text-gray-400 mt-1">
                              {setting.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleInputChange(setting.key, !settings[setting.key])}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings[setting.key] ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ) : setting.type === 'select' ? (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          {setting.label}
                        </label>
                        <select
                          value={settings[setting.key]}
                          onChange={(e) => handleInputChange(setting.key, e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {setting.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <FormField
                        label={setting.label}
                        id={setting.key}
                        type={setting.type}
                        placeholder={setting.placeholder}
                        value={settings[setting.key]}
                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-error/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="h-5 w-5 text-error" />
            </div>
            <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-error/5 border border-error/20 rounded-lg">
              <div>
                <h3 className="font-medium text-white">Clear All Analytics Data</h3>
                <p className="text-sm text-gray-400">
                  Permanently delete all click analytics and statistics
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
                    toast.success('Analytics data cleared successfully');
                  }
                }}
              >
                Clear Data
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-error/5 border border-error/20 rounded-lg">
              <div>
                <h3 className="font-medium text-white">Delete All Links</h3>
                <p className="text-sm text-gray-400">
                  Permanently delete all shortened links and their data
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete all links? This action cannot be undone.')) {
                    toast.success('All links deleted successfully');
                  }
                }}
              >
                Delete All
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
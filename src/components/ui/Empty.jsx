import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const Empty = ({ 
  icon = "Link", 
  title = "No links yet", 
  description = "Create your first shortened link to get started",
  actionText = "Create Link",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-96"
    >
      <Card className="max-w-md mx-auto text-center" hover={false}>
        <div className="space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name={icon} className="h-10 w-10 text-primary" />
          </div>
          
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-400">
              {description}
            </p>
          </div>

          {onAction && (
            <Button
              variant="primary"
              onClick={onAction}
              className="inline-flex items-center"
            >
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              {actionText}
            </Button>
          )}

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="Zap" className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-gray-400">Instant</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="BarChart3" className="h-4 w-4 text-accent" />
              </div>
              <p className="text-xs text-gray-400">Analytics</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="Shield" className="h-4 w-4 text-secondary" />
              </div>
              <p className="text-xs text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;
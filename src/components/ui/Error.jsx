import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-96"
    >
      <Card className="max-w-md mx-auto text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertTriangle" className="h-8 w-8 text-error" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-400">
              {message}
            </p>
          </div>

          <div className="space-y-3">
            {onRetry && (
              <Button
                variant="primary"
                onClick={onRetry}
                className="w-full"
              >
                <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-surface/50 rounded-lg p-3">
            If the problem persists, please contact support or try again later.
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-surface rounded-lg w-48 animate-pulse"></div>
          <div className="h-4 bg-surface/60 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-10 bg-surface rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-surface rounded-lg animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 bg-surface rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-surface/60 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-surface rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-surface/60 rounded w-full animate-pulse"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-surface rounded animate-pulse"></div>
                    <div className="w-8 h-8 bg-surface rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-surface/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-surface rounded w-48 animate-pulse"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 bg-surface rounded w-12 animate-pulse"></div>
                      <div className="h-4 bg-surface rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="glass rounded-xl p-6">
            <div className="space-y-4">
              <div className="h-6 bg-surface rounded w-32 animate-pulse"></div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-surface rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-surface/60 rounded w-3/4 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
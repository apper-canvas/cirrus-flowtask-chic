import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Quick add skeleton */}
      <div className="bg-surface rounded-xl p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-1"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
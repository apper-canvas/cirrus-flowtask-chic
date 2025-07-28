import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ProgressIndicator = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 bg-surface rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="relative">
        <svg width="48" height="48" className="transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="24"
            cy="24"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B47E0" />
              <stop offset="100%" stopColor="#8B7FE8" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {percentage}%
          </span>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <ApperIcon name="Target" size={16} className="text-primary-500" />
          <span className="text-sm font-medium text-gray-900">Progress</span>
        </div>
        
        <p className="text-sm text-gray-600">
          {completed} of {total} tasks completed
        </p>
        
        {percentage === 100 && total > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 mt-1"
          >
            <ApperIcon name="PartyPopper" size={14} className="text-accent-500" />
            <span className="text-xs text-accent-600 font-medium">
              All done! Great job!
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;
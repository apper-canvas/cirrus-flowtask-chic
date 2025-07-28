import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with FlowTask",
  actionLabel = "Add Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ApperIcon name="Plus" size={20} />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;
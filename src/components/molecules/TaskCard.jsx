import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const TaskCard = ({ task, category, onToggleComplete, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    
    // Add visual feedback delay
    setTimeout(() => {
      onToggleComplete(task.Id);
      setIsCompleting(false);
    }, 300);
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isPast(date)) return `Overdue • ${format(date, "MMM d")}`;
    return format(date, "MMM d");
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "text-gray-500";
    
    const date = new Date(dueDate);
    if (isPast(date) && !isToday(date)) return "text-red-600";
    if (isToday(date)) return "text-accent-600";
    return "text-gray-600";
  };

  const priorityDots = {
    low: "bg-green-400",
    medium: "bg-yellow-400", 
    high: "bg-red-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-surface rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${
        task.completed ? "opacity-75" : ""
      } ${isCompleting ? "task-complete-animation" : ""}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}>
                {task.title}
              </h3>
              
              {task.description && (isExpanded || task.description.length < 100) && (
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full priority-indicator ${priorityDots[task.priority]}`}
                title={`${task.priority} priority`}
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100 p-1"
              >
                <ApperIcon name="Edit3" size={14} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </div>
          </div>

<div className="flex items-center gap-3 mt-3 flex-wrap">
            {category && (
              <Badge
                variant="default"
                size="sm"
                className="category-pill"
                style={{ 
                  backgroundColor: `${category.color}20`,
                  color: category.color,
                  borderColor: `${category.color}30`
                }}
              >
                <ApperIcon name={category.icon} size={12} className="mr-1" />
                {category.name}
              </Badge>
            )}

            {task.assignee && (
              <Badge
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-gray-700 border-gray-200 bg-gray-50 hover:bg-gray-100"
              >
                <ApperIcon name="User" size={12} />
                {task.assignee}
              </Badge>
            )}

            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${getDueDateColor(task.dueDate)}`}>
                <ApperIcon name="Calendar" size={12} />
                {formatDueDate(task.dueDate)}
              </div>
            )}

            {task.description && task.description.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary-600 hover:text-primary-700 p-0 h-auto ml-auto"
              >
                {isExpanded ? "Show less" : "Show more"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
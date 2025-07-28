import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  taskCounts,
  onManageCategories 
}) => {
  const filterSections = [
    {
      title: "Status",
      filters: [
        { key: "all", label: "All Tasks", icon: "List", count: taskCounts.all },
        { key: "active", label: "Active", icon: "Circle", count: taskCounts.active },
        { key: "completed", label: "Completed", icon: "CheckCircle", count: taskCounts.completed }
      ]
    },
    {
      title: "Priority",
      filters: [
        { key: "high", label: "High Priority", icon: "AlertCircle", count: taskCounts.high, color: "text-red-600" },
        { key: "medium", label: "Medium Priority", icon: "Clock", count: taskCounts.medium, color: "text-yellow-600" },
        { key: "low", label: "Low Priority", icon: "ChevronDown", count: taskCounts.low, color: "text-green-600" }
      ]
    },
    {
      title: "Due Date",
      filters: [
        { key: "overdue", label: "Overdue", icon: "AlertTriangle", count: taskCounts.overdue, color: "text-red-600" },
        { key: "today", label: "Due Today", icon: "Calendar", count: taskCounts.today, color: "text-accent-600" },
        { key: "tomorrow", label: "Due Tomorrow", icon: "CalendarDays", count: taskCounts.tomorrow }
      ]
    }
  ];

  const handleFilterClick = (filterKey) => {
    const newFilters = { ...filters };
    
    if (filterKey === "all") {
      newFilters.status = null;
      newFilters.priority = null;
      newFilters.dueDate = null;
    } else if (["active", "completed"].includes(filterKey)) {
      newFilters.status = newFilters.status === filterKey ? null : filterKey;
    } else if (["high", "medium", "low"].includes(filterKey)) {
      newFilters.priority = newFilters.priority === filterKey ? null : filterKey;
    } else if (["overdue", "today", "tomorrow"].includes(filterKey)) {
      newFilters.dueDate = newFilters.dueDate === filterKey ? null : filterKey;
    }
    
    onFiltersChange(newFilters);
  };

  const isFilterActive = (filterKey) => {
    if (filterKey === "all") {
      return !filters.status && !filters.priority && !filters.dueDate;
    }
    
    return filters.status === filterKey || 
           filters.priority === filterKey || 
           filters.dueDate === filterKey;
  };

  return (
    <div className="w-64 bg-surface border-r border-gray-200 p-6 space-y-6">
      <div>
        <h2 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Filters
        </h2>
        
        {filterSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {section.title}
            </h3>
            
            <div className="space-y-1">
              {section.filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterClick(filter.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                    isFilterActive(filter.key)
                      ? "filter-active"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon 
                      name={filter.icon} 
                      size={16} 
                      className={filter.color || ""} 
                    />
                    <span>{filter.label}</span>
                  </div>
                  
                  {filter.count > 0 && (
                    <Badge
                      variant={isFilterActive(filter.key) ? "default" : "default"}
                      size="sm"
                      className={isFilterActive(filter.key) ? "bg-white/20 text-white" : ""}
                    >
                      {filter.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Categories</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onManageCategories}
            className="p-1"
          >
            <ApperIcon name="Settings" size={14} />
          </Button>
        </div>
        
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.Id}
              onClick={() => onFiltersChange({ 
                ...filters, 
                categoryId: filters.categoryId === category.Id ? null : category.Id 
              })}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                filters.categoryId === category.Id
                  ? "filter-active"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <ApperIcon 
                  name={category.icon} 
                  size={16}
                  style={{ color: category.color }}
                />
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
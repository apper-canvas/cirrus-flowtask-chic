import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const QuickAddForm = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [categoryId, setCategoryId] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      priority,
      categoryId: categoryId || null,
      description: "",
      dueDate: null
    });

    setTitle("");
    setPriority("medium");
    setCategoryId("");
    setShowAdvanced(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task... (⌘+Enter to save)"
            className="flex-1 quick-add-input"
            autoFocus
          />
          
          <div className="flex gap-1">
            {["low", "medium", "high"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  priority === p 
                    ? priorityColors[p] 
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-2"
          >
            <ApperIcon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={!title.trim()}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            Add
          </Button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-gray-100"
          >
            <div className="flex gap-3">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">No Category</option>
                {categories.map((category) => (
                  <option key={category.Id} value={category.Id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default QuickAddForm;
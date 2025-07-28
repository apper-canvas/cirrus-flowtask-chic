import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import QuickAddForm from "@/components/molecules/QuickAddForm";
import SearchBar from "@/components/molecules/SearchBar";
import ProgressIndicator from "@/components/molecules/ProgressIndicator";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const TaskList = ({ filters }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      if (!task.completed) {
        toast.success("🎉 Task completed! Great job!");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleEditTask = async (task) => {
    // For now, just show a toast - in a full app this would open an edit modal
    toast.info("Edit functionality coming soon!");
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (filters.status === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Category filter
    if (filters.categoryId) {
      filtered = filtered.filter(task => task.categoryId === filters.categoryId);
    }

    // Due date filter
    if (filters.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        switch (filters.dueDate) {
          case "today":
            return dueDate.getTime() === today.getTime();
          case "tomorrow":
            return dueDate.getTime() === tomorrow.getTime();
          case "overdue":
            return dueDate < today;
          default:
            return false;
        }
      });
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Search tasks by title or description..."
          />
        </div>
        <div className="lg:w-80">
          <ProgressIndicator completed={completedTasks} total={totalTasks} />
        </div>
      </div>

      <QuickAddForm onAddTask={handleAddTask} categories={categories} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold text-gray-900">
            {searchTerm ? `Search Results (${filteredTasks.length})` : "Tasks"}
          </h2>
          
          {filteredTasks.length > 0 && (
            <span className="text-sm text-gray-500">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
            <Empty
              title={searchTerm ? "No matching tasks" : "No tasks yet"}
              description={
                searchTerm 
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Create your first task to get started with FlowTask"
              }
              actionLabel="Add Task"
              onAction={() => document.querySelector(".quick-add-input")?.focus()}
              icon={searchTerm ? "Search" : "CheckSquare"}
            />
          ) : (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <TaskCard
                    task={task}
                    category={categories.find(c => c.Id === task.categoryId)}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
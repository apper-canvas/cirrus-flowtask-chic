import { useState, useEffect } from "react";
import { isToday, isTomorrow, isPast } from "date-fns";
import Layout from "@/components/organisms/Layout";
import TaskList from "@/components/organisms/TaskList";
import taskService from "@/services/api/taskService";
import categoryService from "@/services/api/categoryService";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: null,
    priority: null,
    categoryId: null,
    dueDate: null
  });
  
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const calculateTaskCounts = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      all: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
      high: tasks.filter(task => task.priority === "high" && !task.completed).length,
      medium: tasks.filter(task => task.priority === "medium" && !task.completed).length,
      low: tasks.filter(task => task.priority === "low" && !task.completed).length,
      overdue: tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today;
      }).length,
      today: tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        return isToday(new Date(task.dueDate));
      }).length,
      tomorrow: tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        return isTomorrow(new Date(task.dueDate));
      }).length
    };
  };

  const taskCounts = calculateTaskCounts();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.querySelector(".quick-add-input")?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout
      filters={filters}
      onFiltersChange={setFilters}
      categories={categories}
      taskCounts={taskCounts}
    >
      <TaskList filters={filters} />
    </Layout>
  );
};

export default Dashboard;
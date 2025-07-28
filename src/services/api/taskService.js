import mockTasks from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...mockTasks];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.tasks];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const task = this.tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId || null,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }

    this.tasks[index] = { ...this.tasks[index], ...data };
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }

    this.tasks.splice(index, 1);
    return true;
  }
}

export default new TaskService();
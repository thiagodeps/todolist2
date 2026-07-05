import { api } from './api';
import { Task, TaskCreate, TaskUpdate, TaskStatus } from '../types/task';

const isNetworkError = (error: any): boolean => {
  return (
    !error.response || 
    error.code === 'ERR_NETWORK' || 
    error.message === 'Network Error' ||
    error.code === 'ECONNABORTED'
  );
};

const getLocalTasks = (): Task[] => {
  try {
    return JSON.parse(localStorage.getItem('todo_tasks') || '[]');
  } catch {
    return [];
  }
};

const saveLocalTasks = (tasks: Task[]) => {
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
};

export const taskApi = {
  isOffline: false,

  listTasks: async (status?: TaskStatus): Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>('/tasks', {
        params: { status }
      });
      taskApi.isOffline = false;
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        taskApi.isOffline = true;
        let tasks = getLocalTasks().filter(t => !t.deleted_at);
        if (status) {
          tasks = tasks.filter(t => t.status === status);
        }
        return tasks;
      }
      throw error;
    }
  },

  createTask: async (task: TaskCreate): Promise<Task> => {
    try {
      const response = await api.post<Task>('/tasks', task);
      taskApi.isOffline = false;
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        taskApi.isOffline = true;
        const newTask: Task = {
          id: Math.random().toString(36).substring(2, 9),
          title: task.title,
          description: task.description,
          status: TaskStatus.ACTIVE,
          due_date: task.due_date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const tasks = getLocalTasks();
        tasks.push(newTask);
        saveLocalTasks(tasks);
        return newTask;
      }
      throw error;
    }
  },

  updateTask: async (id: string, task: TaskUpdate): Promise<Task> => {
    try {
      const response = await api.patch<Task>('/tasks/' + id, task);
      taskApi.isOffline = false;
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        taskApi.isOffline = true;
        const tasks = getLocalTasks();
        const idx = tasks.findIndex(t => t.id === id);
        if (idx === -1) throw new Error('Task not found');
        const updatedTask: Task = {
          ...tasks[idx],
          ...task,
          updated_at: new Date().toISOString(),
        };
        tasks[idx] = updatedTask;
        saveLocalTasks(tasks);
        return updatedTask;
      }
      throw error;
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    try {
      await api.delete('/tasks/' + id);
      taskApi.isOffline = false;
    } catch (error) {
      if (isNetworkError(error)) {
        taskApi.isOffline = true;
        const tasks = getLocalTasks();
        const idx = tasks.findIndex(t => t.id === id);
        if (idx !== -1) {
          tasks[idx] = {
            ...tasks[idx],
            deleted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          saveLocalTasks(tasks);
        }
        return;
      }
      throw error;
    }
  },
};

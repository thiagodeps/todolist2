import { api } from './api';
import { Task, TaskCreate, TaskUpdate, TaskStatus } from '../types/task';

export const taskApi = {
  listTasks: async (status?: TaskStatus): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks', {
      params: { status }
    });
    return response.data;
  },
  createTask: async (task: TaskCreate): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },
  updateTask: async (id: string, task: TaskUpdate): Promise<Task> => {
    const response = await api.patch<Task>('/tasks/' + id, task);
    return response.data;
  },
  deleteTask: async (id: string): Promise<void> => {
    await api.delete('/tasks/' + id);
  },
};

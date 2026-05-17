export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  due_date?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  due_date?: string;
}

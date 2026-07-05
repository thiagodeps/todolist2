import { useEffect, useState } from 'react';
import { Task, TaskStatus } from './types/task';
import { taskApi } from './services/taskApi';
import { TaskInput } from './components/TaskInput';
import { TaskItem } from './components/TaskItem';
import { FilterBar } from './components/FilterBar';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TaskStatus | 'ALL'>('ALL');
  const [isOffline, setIsOffline] = useState(false);

  const loadTasks = async () => {
    try {
      const statusFilter = filter === 'ALL' ? undefined : filter;
      const data = await taskApi.listTasks(statusFilter);
      setTasks(data);
      setIsOffline(taskApi.isOffline);
    } catch (error) {
      console.error('Failed to load tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleCreate = async (title: string, due_date?: string) => {
    try {
      const newTask = await taskApi.createTask({ title, due_date });
      setIsOffline(taskApi.isOffline);
      // Only add to view if it matches current filter
      if (filter === 'ALL' || filter === TaskStatus.ACTIVE) {
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      alert('Failed to create task');
    }
  };

  const handleUpdate = async (id: string, updates: any) => {
    try {
      const updated = await taskApi.updateTask(id, updates);
      setIsOffline(taskApi.isOffline);
      // If status changed, it might need to be filtered out
      if (updates.status && filter !== 'ALL' && updates.status !== filter) {
        setTasks(tasks.filter(t => t.id !== id));
      } else {
        setTasks(tasks.map(t => t.id === id ? updated : t));
      }
    } catch (error) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setIsOffline(taskApi.isOffline);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <a 
        href="./docs/" 
        style={{ 
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px', 
          borderRadius: '8px', 
          backgroundColor: '#646cff', 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'background-color 0.2s',
          display: 'inline-block'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#535bf2'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#646cff'}
      >
        Documentação
      </a>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Todo Manager</h1>
      </div>
      {isOffline && (
        <div style={{ 
          backgroundColor: '#ffe5d9', 
          color: '#d9381e', 
          border: '1px solid #ffccd5',
          padding: '10px 15px', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          fontSize: '0.9rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⚠️</span>
          <span><strong>Modo Offline:</strong> O servidor de backend não foi detectado. As tarefas estão sendo salvas localmente no seu navegador.</span>
        </div>
      )}
      <TaskInput onCreate={handleCreate} />
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      {loading ? <p>Loading...</p> : (
        <div>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
          {tasks.length === 0 && <p>No tasks found.</p>}
        </div>
      )}
    </div>
  );
}

export default App;

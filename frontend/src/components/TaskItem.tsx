import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types/task';

interface Props {
  task: Task;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<Props> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.due_date ? task.due_date.slice(0, 16) : '');

  // Reset internal state when task changes
  useEffect(() => {
    setEditTitle(task.title);
    setEditDueDate(task.due_date ? task.due_date.slice(0, 16) : '');
  }, [task]);

  const handleToggle = () => {
    onUpdate(task.id, { status: task.status === TaskStatus.ACTIVE ? TaskStatus.COMPLETED : TaskStatus.ACTIVE });
  };

  const handleSave = () => {
    onUpdate(task.id, { 
      title: editTitle,
      due_date: editDueDate || null
    });
    setIsEditing(false);
  };

  const textDecoration = task.status === TaskStatus.COMPLETED ? 'line-through' : 'none';

  const formatDueDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleString();
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '8px 0', borderBottom: '1px solid #eee', padding: '12px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="checkbox" checked={task.status === TaskStatus.COMPLETED} onChange={handleToggle} />
        
        {isEditing ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <input 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
              placeholder="Task title"
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Due:</label>
              <input 
                type="datetime-local" 
                value={editDueDate} 
                onChange={(e) => setEditDueDate(e.target.value)} 
                style={{ fontSize: '12px', padding: '2px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button onClick={handleSave} style={{ padding: '4px 12px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Save</button>
              <button onClick={() => setIsEditing(false)} style={{ padding: '4px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              <span style={{ textDecoration: textDecoration, display: 'block', fontWeight: 500 }}>
                {task.title}
              </span>
              {task.due_date && (
                <span style={{ fontSize: '12px', color: '#d32f2f', display: 'block', marginTop: '2px' }}>
                  ⏰ Due: {formatDueDate(task.due_date)}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setIsEditing(true)}
                style={{ padding: '4px 8px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                style={{ padding: '4px 8px', backgroundColor: '#ff5722', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

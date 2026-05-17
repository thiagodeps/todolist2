import React, { useState } from 'react';

interface Props {
  onCreate: (title: string, due_date?: string) => void;
}

export const TaskInput: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title, dueDate || undefined);
      setTitle('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="What needs to be done?" 
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label htmlFor="due-date" style={{ fontSize: '14px', fontWeight: 500 }}>⏰ Deadline (Optional):</label>
        <input 
          id="due-date"
          type="datetime-local" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
    </form>
  );
};

import React from 'react';
import { TaskStatus } from '../types/task';

interface Props {
  currentFilter: TaskStatus | 'ALL';
  onFilterChange: (filter: TaskStatus | 'ALL') => void;
}

export const FilterBar: React.FC<Props> = ({ currentFilter, onFilterChange }) => {
  return (
    <div style={{ margin: '16px 0', display: 'flex', gap: '8px' }}>
      <button 
        onClick={() => onFilterChange('ALL')}
        style={{ fontWeight: currentFilter === 'ALL' ? 'bold' : 'normal' }}
      >
        All
      </button>
      <button 
        onClick={() => onFilterChange(TaskStatus.ACTIVE)}
        style={{ fontWeight: currentFilter === TaskStatus.ACTIVE ? 'bold' : 'normal' }}
      >
        Active
      </button>
      <button 
        onClick={() => onFilterChange(TaskStatus.COMPLETED)}
        style={{ fontWeight: currentFilter === TaskStatus.COMPLETED ? 'bold' : 'normal' }}
      >
        Completed
      </button>
    </div>
  );
};

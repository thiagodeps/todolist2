import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskItem } from './TaskItem';
import { TaskStatus } from '../types/task';

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    status: TaskStatus.ACTIVE,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();

  it('renders task title', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onUpdate when checkbox is clicked', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnUpdate).toHaveBeenCalledWith('1', { status: TaskStatus.COMPLETED });
  });

  it('enters edit mode when edit button is clicked', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument();
  });
});

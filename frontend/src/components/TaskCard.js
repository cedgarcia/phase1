import React from 'react';
import { updateTaskStatus, deleteTask } from '../api';

const STATUS_CYCLE = { todo: 'in_progress', in_progress: 'done', done: 'todo' };
const STATUS_LABEL = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
const STATUS_COLOR = { todo: '#f59e0b', in_progress: '#6366f1', done: '#22c55e' };

export default function TaskCard({ task, onUpdate, onDelete }) {
  async function handleStatusClick() {
    const next = STATUS_CYCLE[task.status];
    try {
      const updated = await updateTaskStatus(task.id, next);
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      onDelete(task.id);
    } catch (err) {
      console.error(err);
    }
  }

  const color = STATUS_COLOR[task.status];

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid var(--border)`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 600, fontSize: 15 }}>{task.title}</span>
        <button onClick={handleDelete} style={btnStyle('#ef4444')}>✕</button>
      </div>

      {task.description && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{task.description}</p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <button onClick={handleStatusClick} style={{
          background: color + '22',
          color: color,
          border: `1px solid ${color}55`,
          borderRadius: 6,
          padding: '3px 10px',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'Space Mono, monospace',
        }}>
          {STATUS_LABEL[task.status]}
        </button>
        <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'Space Mono, monospace' }}>
          #{task.id}
        </span>
      </div>
    </div>
  );
}

const btnStyle = (color) => ({
  background: 'transparent',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  fontSize: 13,
  padding: '2px 6px',
  borderRadius: 4,
  transition: 'color 0.15s',
  ':hover': { color },
});

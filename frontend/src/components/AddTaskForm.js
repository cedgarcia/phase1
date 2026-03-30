import React, { useState } from 'react';
import { createTask } from '../api';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const task = await createTask(title.trim(), description.trim());
      onAdd(task);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-muted)' }}>New Task</p>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title…"
        required
        style={inputStyle}
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description (optional)"
        style={inputStyle}
      />
      <button type="submit" disabled={loading} style={{
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '9px 20px',
        fontWeight: 600,
        fontSize: 14,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        alignSelf: 'flex-start',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        {loading ? 'Adding…' : '+ Add Task'}
      </button>
    </form>
  );
}

const inputStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '9px 12px',
  color: 'var(--text)',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
  width: '100%',
};

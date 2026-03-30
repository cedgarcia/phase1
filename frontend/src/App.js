import React, { useState, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import AddTaskForm from './components/AddTaskForm';
import { getTasks } from './api';

const COLUMNS = [
  { key: 'todo',        label: 'To Do',       color: '#f59e0b' },
  { key: 'in_progress', label: 'In Progress',  color: '#6366f1' },
  { key: 'done',        label: 'Done',         color: '#22c55e' },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleAdd(task)       { setTasks(prev => [task, ...prev]); }
  function handleUpdate(updated) { setTasks(prev => prev.map(t => t.id === updated.id ? updated : t)); }
  function handleDelete(id)      { setTasks(prev => prev.filter(t => t.id !== id)); }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '-0.5px',
        }}>
          task_manager <span style={{ color: 'var(--accent)' }}>_</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          Docker → Kubernetes learning project · {tasks.length} tasks
        </p>
      </div>

      {/* Add form */}
      <div style={{ maxWidth: 440, marginBottom: 36 }}>
        <AddTaskForm onAdd={handleAdd} />
      </div>

      {/* Status */}
      {loading && <p style={{ color: 'var(--text-muted)' }}>Loading tasks…</p>}
      {error   && <p style={{ color: '#ef4444' }}>Error: {error}</p>}

      {/* Kanban columns */}
      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {COLUMNS.map(col => {
            const colTasks = tasks.filter(t => t.status === col.key);
            return (
              <div key={col.key}>
                {/* Column header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}>
                  <span style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: col.color,
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 12,
                    fontWeight: 700,
                    color: col.color,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}>
                    {col.label}
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    background: col.color + '22',
                    color: col.color,
                    borderRadius: 99,
                    padding: '1px 8px',
                    fontSize: 12,
                    fontFamily: 'Space Mono, monospace',
                  }}>
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {colTasks.length === 0
                    ? <p style={{ color: 'var(--text-muted)', fontSize: 13, padding: '12px 0' }}>No tasks</p>
                    : colTasks.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                        />
                      ))
                  }
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

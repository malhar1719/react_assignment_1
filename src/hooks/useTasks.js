import { useEffect, useMemo, useState } from 'react';
import { useFetch } from './useFetch';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=20';

function mapTodoToTask(todo) {
  return {
    id: String(todo.id),
    title: todo.title,
    description: todo.completed
      ? 'Completed task imported from API'
      : 'Pending task imported from API',
    status: todo.completed ? 'done' : 'todo',
    priority: Number(todo.id) % 3 === 0 ? 'high' : Number(todo.id) % 2 === 0 ? 'medium' : 'low',
  };
}

export function useTasks() {
  const { data, loading, error } = useFetch(API_URL);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTasks(data.map(mapTodoToTask));
    }
  }, [data]);

  const addTask = (taskInput) => {
    const task = {
      id: String(Date.now()),
      title: taskInput.title.trim(),
      description: taskInput.description.trim(),
      status: taskInput.status,
      priority: taskInput.priority,
    };

    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id) => tasks.find((task) => task.id === id);

  return useMemo(
    () => ({
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    }),
    [tasks, loading, error]
  );
}

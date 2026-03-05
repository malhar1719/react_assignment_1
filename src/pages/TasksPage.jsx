import { useMemo, useState } from 'react';
import { Card, Toast, ToastContainer } from 'react-bootstrap';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import TaskFilters from '../components/TaskFilters';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useDebounce } from '../hooks/useDebounce';

export default function TasksPage({
  tasks,
  loading,
  error,
  addTask,
  updateTask,
  deleteTask,
}) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [toastState, setToastState] = useState({
    show: false,
    title: '',
    message: '',
  });

  const debouncedSearch = useDebounce(search, 450);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatches = statusFilter === 'all' || task.status === statusFilter;
      const query = debouncedSearch.trim().toLowerCase();
      const searchMatches =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      return statusMatches && searchMatches;
    });
  }, [tasks, statusFilter, debouncedSearch]);

  const showToast = (title, message) => {
    setToastState({ show: true, title, message });
  };

  const handleSubmit = (taskInput) => {
    if (editingTask) {
      updateTask(editingTask.id, taskInput);
      showToast('Task updated', 'Your task changes were saved successfully.');
      setEditingTask(null);
      return;
    }

    addTask(taskInput);
    showToast('Task added', 'New task has been added successfully.');
  };

  const handleDelete = (id) => {
    deleteTask(id);
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
    showToast('Task deleted', 'Task was removed successfully.');
  };

  return (
    <PageContainer>
      <h1 className="mb-3">Tasks</h1>

      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <Card className="shadow-sm border-0 mb-3">
        <Card.Body>
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </Card.Body>
      </Card>

      {loading && <LoadingState message="Loading tasks from API..." />}
      <ErrorState message={error} />

      {!loading && !error && (
        <TaskList tasks={filteredTasks} onEdit={setEditingTask} onDelete={handleDelete} />
      )}

      <ToastContainer
        className="p-3 position-fixed bottom-0 end-0"
        style={{ zIndex: 1080 }}
      >
        <Toast
          bg="light"
          show={toastState.show}
          autohide
          delay={2200}
          onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">{toastState.title}</strong>
          </Toast.Header>
          <Toast.Body>{toastState.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </PageContainer>
  );
}

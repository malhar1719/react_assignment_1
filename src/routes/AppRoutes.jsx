import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { useTasks } from '../hooks/useTasks';
import AppLayout from '../layouts/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import TaskDetailPage from '../pages/TaskDetailPage';
import TasksPage from '../pages/TasksPage';

export default function AppRoutes() {
  const taskState = useTasks();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage {...taskState} />} />
        <Route path="/tasks" element={<TasksPage {...taskState} />} />
        <Route path="/tasks/:id" element={<TaskDetailPage {...taskState} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

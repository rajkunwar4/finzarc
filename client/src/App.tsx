// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { TasksPage } from './pages/tasks/TasksPage';
import { TaskDetailPage } from './pages/tasks/TaskDetailPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute children={<LoginPage />} />} />
          <Route path="/register" element={<PublicRoute children={<RegisterPage />} />} />
          <Route element={<ProtectedRoute children={<Layout />} />}>
            <Route path="/dashboard" element={<ProtectedRoute children={<DashboardPage />} />} />
            <Route path="/tasks" element={<ProtectedRoute children={<TasksPage />} />} />
            <Route path="/tasks/:id" element={<ProtectedRoute children={<TaskDetailPage />} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
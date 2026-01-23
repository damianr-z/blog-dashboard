import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

import NewBlog from './pages/NewBlog';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Layout from './ui/Layout';
import Spinner from './ui/Spinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          {/* navigate to dashboard by default */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/"
              element={
                <ProtectedRoute url="/login">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" index element={<Dashboard />} />
              <Route path="new_blog" element={<NewBlog />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:blogId" element={<Blog />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '1.1rem',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--c-grey-700)',
              color: 'var(--c-blue-100)',
              fontFamily: 'var(--ff-btn)',
              letterSpacing: '0.2px',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

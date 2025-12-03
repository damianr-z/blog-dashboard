import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';

import Dashboard from './Pages/Dashboard';
import Blogs from './Pages/Blogs';
import Blog from './Pages/Blog';
import Users from './Pages/Users';
import Settings from './Pages/Settings';
import Account from './Pages/Account';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PageNotFound from './Pages/PageNotFound';
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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        {/* navigate to home page if no path is provided */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute url="/login">
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
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
  );
}

import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

import Dashboard from './pages/Dashboard';
import Blogs from './Pages/Blogs';
import Blog from './pages/Blog';
import Users from './Pages/Users';
import Settings from './Pages/Settings';
import Account from './Pages/Account';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import Layout from './ui/Layout';
import Spinner from './ui/Spinner';

// ProtectedRoute component to guard routes that require authentication
function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  const BYPASS_AUTH = true;

  if (BYPASS_AUTH) {
    return children;
  }
  // Wait for Clerk to load
  if (!isLoaded) return <Spinner />;

  // Redirect to login if not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  // User is authenticated, render the protecte content
  return children;
}

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
              <ProtectedRoute>
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
          <Route path="login" element={<Login />} />
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
            FontFace: 'var(--ff-btn)',
            letterSpacing: '0.2px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

import styled from 'styled-components';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ProtectedRoute component to guard routes that require authentication
export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  const BYPASS_AUTH = import.meta.env.VITE_BYPASS_AUTH === 'true';

  if (BYPASS_AUTH) {
    console.warn('⚠️ AUTH BYPASS ENABLED - FOR DEVELOPMENT ONLY');
    return children;
  }


  // Wait for Clerk to load
  if (!isLoaded)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // Redirect to login if not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  // User is authenticated, render the protecte content
  return children;
}

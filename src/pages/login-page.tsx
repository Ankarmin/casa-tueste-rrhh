import { startTransition } from 'react';
import { toast } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import { Login } from '../components/auth/login-form';

type LoginPageProps = {
  isAuthenticated: boolean;
  onLoginSuccess: () => void;
};

export function LoginPage({ isAuthenticated, onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = () => {
    onLoginSuccess();
    toast.success('Bienvenido, David');

    startTransition(() => {
      navigate('/dashboard', { replace: true });
    });
  };

  return <Login onLogin={handleLogin} />;
}

import { startTransition } from 'react';
import { toast } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import { unwrapResult } from '../lib/electron-api';
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

  const handleLogin = async ({ username, password }: { username: string; password: string }) => {
    try {
      const user = await unwrapResult(window.electronAPI.auth.login({ username, password }));

      onLoginSuccess();
      toast.success(`Bienvenido, ${user.nombre.split(' ')[0]}`);

      startTransition(() => {
        navigate('/dashboard', { replace: true });
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo iniciar sesion.');
    }
  };

  return <Login onLogin={handleLogin} />;
}

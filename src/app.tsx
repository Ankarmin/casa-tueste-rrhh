import { useState } from 'react';
import { Toaster } from 'sonner';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PanelLayout } from './components/layout/panel-layout';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { AsistenciasPage } from './pages/asistencias-page';
import { ContratosPage } from './pages/contratos-page';
import { ContratoDetallePage } from './pages/contrato-detalle-page';
import { AltasPage } from './pages/altas-page';
import { BajasPage } from './pages/bajas-page';
import { EmpleadosPage } from './pages/empleados-page';
import { EmpleadoDetallePage } from './pages/empleado-detalle-page';
import { NotFoundPage } from './pages/not-found-page';

type ProtectedLayoutProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

function ProtectedLayout({ isAuthenticated, onLogout }: ProtectedLayoutProps) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <PanelLayout onLogout={onLogout}>
      <Outlet />
    </PanelLayout>
  );
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              isAuthenticated={isAuthenticated}
              onLoginSuccess={() => {
                setIsAuthenticated(true);
              }}
            />
          }
        />
        <Route
          element={
            <ProtectedLayout
              isAuthenticated={isAuthenticated}
              onLogout={() => {
                setIsAuthenticated(false);
              }}
            />
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/asistencias" element={<AsistenciasPage />} />
          <Route path="/contratos" element={<ContratosPage />} />
          <Route path="/contratos/:id" element={<ContratoDetallePage />} />
          <Route path="/altas" element={<AltasPage />} />
          <Route path="/bajas" element={<BajasPage />} />
          <Route path="/empleados" element={<EmpleadosPage />} />
          <Route path="/empleados/:id" element={<EmpleadoDetallePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster closeButton position="top-right" richColors />
    </>
  );
}

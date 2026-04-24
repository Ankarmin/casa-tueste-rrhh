import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowUpRight, Clock, Coffee, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { KpiCard } from '../components/panel/kpi-card';
import { StatusBadge } from '../components/panel/status-badge';
import { buttonVariants } from '../components/ui/button';
import { Card } from '../components/ui/card';
import type { DashboardSummary } from '../shared/dto';
import { unwrapResult } from '../lib/electron-api';

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    void unwrapResult(window.electronAPI.dashboard.getSummary())
      .then((response) => {
        if (isMounted) {
          setSummary(response);
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el panel.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <>
        <Header title="Panel general" subtitle="Resumen operativo de Recursos Humanos · Casa Tueste" />
        <main className="flex flex-1 items-center justify-center p-6 text-sm text-destructive">{error}</main>
      </>
    );
  }

  if (!summary) {
    return (
      <>
        <Header title="Panel general" subtitle="Resumen operativo de Recursos Humanos · Casa Tueste" />
        <main className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">Cargando panel...</main>
      </>
    );
  }

  return (
    <>
      <Header title="Panel general" subtitle="Resumen operativo de Recursos Humanos · Casa Tueste" />
      <main className="animate-fade-in flex-1 space-y-8 overflow-y-auto p-6 lg:p-10">
        <Card className="shadow-elegant-lg relative overflow-hidden border-0 bg-gradient-primary p-8 text-primary-foreground">
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <Coffee className="h-3.5 w-3.5" /> Buen dia, {summary.currentUser.nombre.split(' ')[0]}
              </div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Tu equipo esta listo para atender otra jornada con excelencia.
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Hoy tienes {summary.kpis.asistenciasHoy} colaboradores en sede y {summary.kpis.contratosPorVencer} contratos que requieren
                tu atencion.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/altas" className={buttonVariants({ size: 'lg', className: 'bg-white !text-[#6F4E37] hover:bg-white/90' })}>
                Registrar alta
              </Link>
              <Link
                to="/asistencias"
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className: 'border-white/30 bg-transparent !text-white hover:bg-white/10 hover:!text-white',
                })}
              >
                Ver asistencias
              </Link>
            </div>
          </div>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Empleados activos" value={summary.kpis.totalEmpleados} icon={Users} accent="primary" hint="Plantilla total" trend="+2 este mes" />
          <KpiCard title="Asistencias hoy" value={summary.kpis.asistenciasHoy} icon={Clock} accent="success" hint={`de ${summary.kpis.totalEmpleados} programados`} />
          <KpiCard title="Contratos vigentes" value={summary.kpis.contratosVigentes} icon={FileText} accent="accent" hint="Documentacion al dia" />
          <KpiCard title="Por vencer (90 dias)" value={summary.kpis.contratosPorVencer} icon={AlertTriangle} accent="warning" hint="Requieren renovacion" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border/60 p-6 shadow-elegant lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Asistencias del dia</h3>
                <p className="text-sm text-muted-foreground">Ultimos registros recibidos</p>
              </div>
              <Link to="/asistencias" className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'text-primary hover:text-primary-glow' })}>
                Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {summary.recientes.map((asistencia) => {
                return (
                  <div key={asistencia.id} className="flex items-center justify-between py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                        {asistencia.empleado.iniciales}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{asistencia.empleado.nombre}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {asistencia.empleado.puesto}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden font-mono text-sm text-muted-foreground sm:block">{asistencia.entrada}</span>
                      <StatusBadge status={asistencia.estado} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="border-border/60 p-6 shadow-elegant">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-foreground">Contratos por vencer</h3>
              <p className="text-sm text-muted-foreground">Accion recomendada</p>
            </div>
            <div className="space-y-4">
              {summary.proximosVencer.map((contrato) => {
                return (
                  <div key={contrato.id} className="rounded-lg border border-border bg-surface/50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{contrato.empleado.nombre}</p>
                      <StatusBadge status={contrato.estado} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {contrato.tipo} · vence {contrato.fin}
                    </p>
                  </div>
                );
              })}
              <Link to="/contratos" className={buttonVariants({ variant: 'outline', className: 'w-full' })}>
                Gestionar contratos
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}

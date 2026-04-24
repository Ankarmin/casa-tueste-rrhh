import { AlertTriangle, ArrowUpRight, Clock, Coffee, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { KpiCard } from '../components/panel/kpi-card';
import { StatusBadge } from '../components/panel/status-badge';
import { buttonVariants } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { asistenciasHoy, contratos, currentUser, empleadoPorId, kpis } from '../lib/mock-data';

export function DashboardPage() {
  const recientes = asistenciasHoy.slice(0, 5);
  const proximosVencer = contratos.filter((contrato) => contrato.estado === 'por_vencer');

  return (
    <>
      <Header title="Panel general" subtitle="Resumen operativo de Recursos Humanos · Casa Tueste" />
      <main className="animate-fade-in flex-1 space-y-8 overflow-y-auto p-6 lg:p-10">
        <Card className="shadow-elegant-lg relative overflow-hidden border-0 bg-gradient-primary p-8 text-primary-foreground">
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <Coffee className="h-3.5 w-3.5" /> Buen dia, {currentUser.nombre.split(' ')[0]}
              </div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Tu equipo esta listo para atender otra jornada con excelencia.
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Hoy tienes {kpis.asistenciasHoy} colaboradores en sede y {kpis.contratosPorVencer} contratos que requieren
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
          <KpiCard title="Empleados activos" value={kpis.totalEmpleados} icon={Users} accent="primary" hint="Plantilla total" trend="+2 este mes" />
          <KpiCard title="Asistencias hoy" value={kpis.asistenciasHoy} icon={Clock} accent="success" hint={`de ${kpis.totalEmpleados} programados`} />
          <KpiCard title="Contratos vigentes" value={kpis.contratosVigentes} icon={FileText} accent="accent" hint="Documentacion al dia" />
          <KpiCard title="Por vencer (90 dias)" value={kpis.contratosPorVencer} icon={AlertTriangle} accent="warning" hint="Requieren renovacion" />
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
              {recientes.map((asistencia) => {
                const empleado = empleadoPorId(asistencia.empleadoId);

                if (!empleado) {
                  return null;
                }

                return (
                  <div key={asistencia.empleadoId} className="flex items-center justify-between py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                        {empleado.iniciales}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{empleado.nombre}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {empleado.puesto} · {empleado.area}
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
              {proximosVencer.map((contrato) => {
                const empleado = empleadoPorId(contrato.empleadoId);

                if (!empleado) {
                  return null;
                }

                return (
                  <div key={contrato.id} className="rounded-lg border border-border bg-surface/50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{empleado.nombre}</p>
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

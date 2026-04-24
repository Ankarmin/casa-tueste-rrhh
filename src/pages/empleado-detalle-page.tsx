import { ArrowLeft, Briefcase, CalendarDays, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { StatusBadge } from '../components/panel/status-badge';
import { buttonVariants } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { asistenciasHoy, contratos, empleadoPorId } from '../lib/mock-data';
import { NotFoundPage } from './not-found-page';

export function EmpleadoDetallePage() {
  const { id = '' } = useParams();
  const empleado = empleadoPorId(id);

  if (!empleado) {
    return <NotFoundPage />;
  }

  const contrato = contratos.find((item) => item.empleadoId === empleado.id);
  const asistencia = asistenciasHoy.find((item) => item.empleadoId === empleado.id);

  return (
    <>
      <Header title={empleado.nombre} subtitle="Detalle del expediente del colaborador" />
      <main className="animate-fade-in flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/empleados" className={buttonVariants({ variant: 'outline' })}><ArrowLeft className="h-4 w-4" /> Volver a empleados</Link>
            <StatusBadge status={empleado.estado} />
          </div>

          <Card className="overflow-hidden border-0 bg-gradient-primary p-8 text-primary-foreground shadow-elegant-lg">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-xl font-semibold text-white">{empleado.iniciales}</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary-foreground/70">Expediente</p>
                  <h2 className="mt-1 text-3xl font-semibold">{empleado.nombre}</h2>
                  <p className="mt-1 text-primary-foreground/85">{empleado.puesto} · {empleado.area}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 px-5 py-4"><p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">ID interno</p><p className="mt-1 text-xl font-semibold">{empleado.id}</p></div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="border-border/60 p-6 shadow-elegant lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground">Informacion general</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><Briefcase className="h-4 w-4 text-primary" /> Puesto y area</div><p className="mt-2 text-base font-semibold text-foreground">{empleado.puesto}</p><p className="text-sm text-muted-foreground">{empleado.area}</p></div>
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" /> Fecha de ingreso</div><p className="mt-2 text-base font-semibold text-foreground">{empleado.fechaIngreso}</p><p className="text-sm text-muted-foreground">Antiguedad administrativa registrada</p></div>
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><Mail className="h-4 w-4 text-primary" /> Correo</div><p className="mt-2 text-base font-semibold text-foreground">{empleado.email}</p><p className="text-sm text-muted-foreground">Canal principal de contacto</p></div>
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><Phone className="h-4 w-4 text-primary" /> Telefono</div><p className="mt-2 text-base font-semibold text-foreground">{empleado.telefono}</p><p className="text-sm text-muted-foreground">Contacto registrado en expediente</p></div>
              </div>
            </Card>

            <Card className="border-border/60 p-6 shadow-elegant">
              <h3 className="text-lg font-semibold text-foreground">Estado actual</h3>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border/60 bg-background px-4 py-3"><div className="flex items-center gap-2 font-medium text-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Estado laboral</div><div className="mt-2"><StatusBadge status={empleado.estado} /></div></div>
                <div className="rounded-xl border border-border/60 bg-background px-4 py-3"><p className="font-medium text-foreground">Contrato asociado</p><p className="mt-1">{contrato ? `${contrato.id} · ${contrato.tipo}` : 'Sin contrato registrado'}</p></div>
                <div className="rounded-xl border border-border/60 bg-background px-4 py-3"><p className="font-medium text-foreground">Asistencia del dia</p><p className="mt-1">{asistencia ? `${asistencia.estado} · entrada ${asistencia.entrada}` : 'Sin registro de asistencia'}</p></div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

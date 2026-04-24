import { ArrowLeft, CalendarRange, CircleDollarSign, FileText, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { StatusBadge } from '../components/panel/status-badge';
import { buttonVariants } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { contratoPorId, empleadoPorId } from '../lib/mock-data';
import { NotFoundPage } from './not-found-page';

const fmtMoney = (amount: number) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 0,
  }).format(amount);

export function ContratoDetallePage() {
  const { id = '' } = useParams();
  const contrato = contratoPorId(id);

  if (!contrato) {
    return <NotFoundPage />;
  }

  const empleado = empleadoPorId(contrato.empleadoId);

  if (!empleado) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Header title={`Contrato ${contrato.id}`} subtitle="Detalle administrativo del contrato laboral" />
      <main className="animate-fade-in flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/contratos" className={buttonVariants({ variant: 'outline' })}><ArrowLeft className="h-4 w-4" /> Volver a contratos</Link>
            <StatusBadge status={contrato.estado} />
          </div>

          <Card className="overflow-hidden border-0 bg-gradient-primary p-8 text-primary-foreground shadow-elegant-lg">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary-foreground/70">Casa Tueste</p>
                <h2 className="mt-3 text-3xl font-semibold">{contrato.tipo}</h2>
                <p className="mt-2 max-w-2xl text-primary-foreground/85">Documento laboral asociado a {empleado.nombre}, con seguimiento de vigencia, salario y cumplimiento documental.</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-5 py-4"><p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Folio</p><p className="mt-1 text-xl font-semibold">{contrato.id}</p></div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="border-border/60 p-6 shadow-elegant lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground">Resumen del contrato</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><FileText className="h-4 w-4 text-primary" /> Colaborador asignado</div><p className="mt-2 text-base font-semibold text-foreground">{empleado.nombre}</p><p className="text-sm text-muted-foreground">{empleado.puesto} · {empleado.area}</p></div>
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><CircleDollarSign className="h-4 w-4 text-primary" /> Compensacion</div><p className="mt-2 text-base font-semibold text-foreground">{fmtMoney(contrato.salario)}</p><p className="text-sm text-muted-foreground">Salario mensual bruto pactado</p></div>
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><CalendarRange className="h-4 w-4 text-primary" /> Vigencia</div><p className="mt-2 text-base font-semibold text-foreground">{contrato.inicio} al {contrato.fin}</p><p className="text-sm text-muted-foreground">Periodo activo del documento</p></div>
                <div className="rounded-2xl border border-border/60 bg-card p-4"><div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Estado administrativo</div><div className="mt-2"><StatusBadge status={contrato.estado} /></div><p className="mt-2 text-sm text-muted-foreground">Monitoreo de renovaciones y vencimientos</p></div>
              </div>
            </Card>

            <Card className="border-border/60 p-6 shadow-elegant">
              <h3 className="text-lg font-semibold text-foreground">Acciones recomendadas</h3>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border/60 bg-background px-4 py-3">Validar expediente fisico y digital del colaborador.</div>
                <div className="rounded-xl border border-border/60 bg-background px-4 py-3">Confirmar firma de ambas partes y anexos vigentes.</div>
                <div className="rounded-xl border border-border/60 bg-background px-4 py-3">Programar recordatorio de renovacion antes del vencimiento.</div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

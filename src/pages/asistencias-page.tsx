import { Calendar, CheckCircle2, Clock, LogOut, Search } from 'lucide-react';
import { Header } from '../components/layout/header';
import { KpiCard } from '../components/panel/kpi-card';
import { StatusBadge } from '../components/panel/status-badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { asistenciasHoy, empleadoPorId, kpis } from '../lib/mock-data';

export function AsistenciasPage() {
  return (
    <>
      <Header title="Control de asistencias" subtitle="Registro de entradas, salidas y estados del personal" />
      <main className="animate-fade-in flex-1 space-y-8 overflow-y-auto p-6 lg:p-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Presentes" value={asistenciasHoy.filter((asistencia) => asistencia.estado === 'presente').length} icon={CheckCircle2} accent="success" />
          <KpiCard title="Tardanzas" value={asistenciasHoy.filter((asistencia) => asistencia.estado === 'tarde').length} icon={Clock} accent="warning" />
          <KpiCard title="Ausentes" value={asistenciasHoy.filter((asistencia) => asistencia.estado === 'ausente').length} icon={LogOut} accent="primary" />
          <KpiCard title="Programados hoy" value={kpis.totalEmpleados} icon={Calendar} accent="accent" />
        </div>

        <Card className="overflow-hidden border-border/60 shadow-elegant">
          <div className="border-b border-border p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Asistencias de hoy</h3>
                <p className="text-sm text-muted-foreground">Jornada del 22 de abril, 2026</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar empleado..." className="bg-background pl-9" />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                <TableHead>Empleado</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asistenciasHoy.map((asistencia) => {
                const empleado = empleadoPorId(asistencia.empleadoId);

                if (!empleado) {
                  return null;
                }

                return (
                  <TableRow key={asistencia.empleadoId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {empleado.iniciales}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{empleado.nombre}</p>
                          <p className="text-xs text-muted-foreground">{empleado.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{empleado.puesto}</TableCell>
                    <TableCell className="font-mono text-sm">{asistencia.entrada}</TableCell>
                    <TableCell className="font-mono text-sm">{asistencia.salida ?? '-'}</TableCell>
                    <TableCell>
                      <StatusBadge status={asistencia.estado} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
                        Historial
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </main>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, LogOut, Search } from 'lucide-react';
import { Header } from '../components/layout/header';
import { KpiCard } from '../components/panel/kpi-card';
import { StatusBadge } from '../components/panel/status-badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import type { AttendancesOverview } from '../shared/dto';
import { unwrapResult } from '../lib/electron-api';

export function AsistenciasPage() {
  const [overview, setOverview] = useState<AttendancesOverview | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    void unwrapResult(window.electronAPI.attendances.listToday())
      .then((response) => {
        if (isMounted) {
          setOverview(response);
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar asistencias.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const asistencias = (overview?.asistencias ?? []).filter((asistencia) =>
    [asistencia.empleado.nombre, asistencia.empleado.puesto, asistencia.empleado.id]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );

  return (
    <>
      <Header title="Control de asistencias" subtitle="Registro de entradas, salidas y estados del personal" />
      <main className="animate-fade-in flex-1 space-y-8 overflow-y-auto p-6 lg:p-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Presentes" value={overview?.stats.presentes ?? 0} icon={CheckCircle2} accent="success" />
          <KpiCard title="Tardanzas" value={overview?.stats.tardanzas ?? 0} icon={Clock} accent="warning" />
          <KpiCard title="Ausentes" value={overview?.stats.ausentes ?? 0} icon={LogOut} accent="primary" />
          <KpiCard title="Programados hoy" value={overview?.stats.programadosHoy ?? 0} icon={Calendar} accent="accent" />
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
                  <Input placeholder="Buscar empleado..." className="bg-background pl-9" value={query} onChange={(event) => setQuery(event.target.value)} />
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
              {error ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-6 text-center text-sm text-destructive">{error}</TableCell>
                </TableRow>
              ) : asistencias.map((asistencia) => (
                  <TableRow key={asistencia.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {asistencia.empleado.iniciales}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{asistencia.empleado.nombre}</p>
                          <p className="text-xs text-muted-foreground">{asistencia.empleado.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{asistencia.empleado.puesto}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </>
  );
}

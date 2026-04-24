import { useEffect, useState } from 'react';
import { Save, UserMinus } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../components/layout/header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { SelectField } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Textarea } from '../components/ui/textarea';
import type { TerminationsOverview } from '../shared/dto';
import { unwrapResult } from '../lib/electron-api';

const terminationTypeMap = {
  vol: 'Voluntaria',
  invol: 'Involuntaria',
  fin: 'Fin de contrato',
  jub: 'Jubilacion',
} as const;

export function BajasPage() {
  const [overview, setOverview] = useState<TerminationsOverview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadOverview = async () => {
    const response = await unwrapResult(window.electronAPI.terminations.list());
    setOverview(response);
  };

  useEffect(() => {
    void loadOverview().catch((error) => {
      toast.error(error instanceof Error ? error.message : 'No se pudo cargar bajas.');
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      await unwrapResult(
        window.electronAPI.terminations.create({
          empleadoId: String(formData.get('empleado') ?? ''),
          tipo: terminationTypeMap[String(formData.get('tipoBaja') ?? 'vol') as keyof typeof terminationTypeMap],
          motivo: String(formData.get('motivo') ?? ''),
          fecha: String(formData.get('fecha') ?? ''),
          observaciones: String(formData.get('obs') ?? ''),
        }),
      );
      await loadOverview();
      form.reset();
      toast.success('Baja registrada en el expediente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo registrar la baja.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header title="Baja de personal" subtitle="Registra la finalizacion laboral de un colaborador" />
      <main className="animate-fade-in flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
          <section className="rounded-2xl border-0 bg-gradient-primary px-5 py-4 text-primary-foreground shadow-elegant-lg">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white"><UserMinus className="h-5 w-5" /></div>
              <div>
                <h2 className="text-lg font-semibold text-primary-foreground">Buenas practicas antes de registrar una baja</h2>
                <p className="mt-1 text-sm text-primary-foreground/85">Verifica entrevista de salida, devolucion de activos, inventario, finiquito y archivo del expediente.</p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
            <Card className="border-border/60 shadow-elegant">
              <div className="border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive"><UserMinus className="h-5 w-5" /></div>
                  <div><h3 className="text-lg font-semibold text-foreground">Registrar nueva baja</h3><p className="text-sm text-muted-foreground">Documenta el motivo y la fecha de finalizacion.</p></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                   <div className="space-y-2"><Label htmlFor="empleado">Empleado</Label><SelectField id="empleado" name="empleado" defaultValue=""><option value="" disabled>Selecciona un colaborador</option>{overview?.activos.map((empleado) => <option key={empleado.id} value={empleado.id}>{empleado.nombre} · {empleado.puesto}</option>)}</SelectField></div>
                   <div className="space-y-2"><Label htmlFor="tipoBaja">Tipo de baja</Label><SelectField id="tipoBaja" name="tipoBaja" defaultValue=""><option value="" disabled>Selecciona el tipo</option><option value="vol">Voluntaria</option><option value="invol">Involuntaria</option><option value="fin">Fin de contrato</option><option value="jub">Jubilacion</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="motivo">Motivo</Label><Input id="motivo" name="motivo" placeholder="Ej. cambio de ciudad" required /></div>
                   <div className="space-y-2"><Label htmlFor="fecha">Fecha de finalizacion</Label><Input id="fecha" name="fecha" type="date" required /></div>
                   <div className="space-y-2 md:col-span-2"><Label htmlFor="obs">Observaciones</Label><Textarea id="obs" name="obs" placeholder="Detalles del proceso de salida, entrega de inventario, finiquito..." rows={6} /></div>
                 </div>

                 <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                   <Button type="reset" variant="outline" disabled={isSubmitting}>Cancelar</Button>
                   <Button type="submit" className="bg-gradient-primary text-primary-foreground shadow-glow" disabled={isSubmitting}><Save className="h-4 w-4" /> {isSubmitting ? 'Guardando...' : 'Confirmar baja'}</Button>
                 </div>
               </form>
            </Card>

            <Card className="overflow-hidden border-border/60 shadow-elegant">
              <div className="border-b border-border p-5"><h3 className="text-lg font-semibold text-foreground">Historial de bajas</h3><p className="text-sm text-muted-foreground">Registros previos de salidas del personal</p></div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                    <TableHead>Folio</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overview?.bajas.map((baja) => (
                      <TableRow key={baja.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">{baja.id}</TableCell>
                        <TableCell><p className="font-medium text-foreground">{baja.empleado.nombre}</p><p className="text-xs text-muted-foreground">{baja.empleado.puesto}</p></TableCell>
                        <TableCell className="text-sm">{baja.motivo}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{baja.tipo}</TableCell>
                        <TableCell className="text-sm">{baja.fecha}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

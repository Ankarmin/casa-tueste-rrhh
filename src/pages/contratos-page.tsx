import { Download, Eye, FileCheck2, FileText, FileWarning, FileX2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { KpiCard } from '../components/panel/kpi-card';
import { StatusBadge } from '../components/panel/status-badge';
import { Button, buttonVariants } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { contratos, empleadoPorId } from '../lib/mock-data';

const fmtMoney = (amount: number) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 0,
  }).format(amount);

export function ContratosPage() {
  return (
    <>
      <Header title="Gestion de contratos" subtitle="Control de vigencias, renovaciones y documentacion laboral" />
      <main className="animate-fade-in flex-1 space-y-8 overflow-y-auto p-6 lg:p-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Total contratos" value={contratos.length} icon={FileText} accent="primary" />
          <KpiCard title="Vigentes" value={contratos.filter((contrato) => contrato.estado === 'vigente').length} icon={FileCheck2} accent="success" />
          <KpiCard title="Por vencer" value={contratos.filter((contrato) => contrato.estado === 'por_vencer').length} icon={FileWarning} accent="warning" />
          <KpiCard title="Vencidos" value={contratos.filter((contrato) => contrato.estado === 'vencido').length} icon={FileX2} accent="primary" />
        </div>

        <Card className="overflow-hidden border-border/60 shadow-elegant">
          <div className="border-b border-border p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Listado de contratos</h3>
                <p className="text-sm text-muted-foreground">Estado y vigencia por colaborador</p>
              </div>
              <Button className="bg-gradient-primary text-primary-foreground shadow-glow">
                <Download className="h-4 w-4" /> Exportar
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                <TableHead>Contrato</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Vigencia</TableHead>
                <TableHead className="text-right">Salario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => {
                const empleado = empleadoPorId(contrato.empleadoId);

                if (!empleado) {
                  return null;
                }

                return (
                  <TableRow key={contrato.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{contrato.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {empleado.iniciales}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{empleado.nombre}</p>
                          <p className="text-xs text-muted-foreground">{empleado.puesto}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{contrato.tipo}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {contrato.inicio} → {contrato.fin}
                    </TableCell>
                    <TableCell className="text-right font-medium">{fmtMoney(contrato.salario)}</TableCell>
                    <TableCell>
                      <StatusBadge status={contrato.estado} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/contratos/${contrato.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'text-primary hover:text-primary-glow' })}>
                        <Eye className="h-4 w-4" /> Ver
                      </Link>
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

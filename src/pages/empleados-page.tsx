import { Mail, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { StatusBadge } from '../components/panel/status-badge';
import { buttonVariants } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { empleados } from '../lib/mock-data';

export function EmpleadosPage() {
  return (
    <>
      <Header title="Directorio de empleados" subtitle="Plantilla completa de Casa Tueste" />
      <main className="animate-fade-in flex-1 space-y-8 overflow-y-auto p-6 lg:p-10">
        <Card className="overflow-hidden border-border/60 shadow-elegant">
          <div className="border-b border-border p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{empleados.length} colaboradores</h3>
                <p className="text-sm text-muted-foreground">Datos de contacto y estatus</p>
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
                <TableHead>Contacto</TableHead>
                <TableHead>Ingreso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
                        {empleado.iniciales}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{empleado.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {empleado.id} · {empleado.area}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{empleado.puesto}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <p className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" /> {empleado.email}</p>
                      <p className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3 w-3" /> {empleado.telefono}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{empleado.fechaIngreso}</TableCell>
                  <TableCell><StatusBadge status={empleado.estado} /></TableCell>
                  <TableCell className="text-right">
                    <Link to={`/empleados/${empleado.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'text-primary hover:text-primary-glow' })}>
                      Ver detalle
                    </Link>
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

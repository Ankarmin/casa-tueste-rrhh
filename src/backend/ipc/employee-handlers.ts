import { ipcMain } from 'electron';
import { z } from 'zod';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { EmployeeService } from '../services/employee-service';
import { toResult } from './helpers';

const createEmployeeSchema = z.object({
  nombres: z.string().trim().min(1),
  apellidoPaterno: z.string().trim().min(1),
  apellidoMaterno: z.string().trim().min(1),
  dni: z.string().trim().min(8),
  fechaNacimiento: z.string().min(1),
  sexo: z.string().min(1),
  estadoCivil: z.string().min(1),
  nacionalidad: z.string().trim().min(1),
  email: z.string().email(),
  telefono: z.string().trim().min(1),
  departamento: z.string().min(1),
  distrito: z.string().trim().min(1),
  direccion: z.string().trim().min(1),
  puesto: z.string().min(1),
  area: z.string().min(1),
  fechaIngreso: z.string().min(1),
  salario: z.number().nonnegative(),
  tipoContrato: z.string().min(1),
  regimen: z.string().min(1),
  jornada: z.string().min(1),
  sede: z.string().min(1),
  sistemaPensiones: z.string().min(1),
  cuspp: z.string(),
  regimenSalud: z.string().min(1),
  ruc: z.string(),
  banco: z.string(),
  cci: z.string(),
  emergenciaNombre: z.string(),
  emergenciaParentesco: z.string(),
  emergenciaTelefono: z.string(),
  emergenciaNotas: z.string(),
});

export function registerEmployeeHandlers() {
  const employeeService = new EmployeeService();

  ipcMain.handle(IPC_CHANNELS.employeesList, async () => toResult(async () => employeeService.list()));
  ipcMain.handle(IPC_CHANNELS.employeesActive, async () =>
    toResult(async () => employeeService.listActive()),
  );
  ipcMain.handle(IPC_CHANNELS.employeesGetById, async (_event, id: string) =>
    toResult(async () => employeeService.getById(String(id))),
  );
  ipcMain.handle(IPC_CHANNELS.employeesCreate, async (_event, input) =>
    toResult(async () => employeeService.create(createEmployeeSchema.parse(input))),
  );
}

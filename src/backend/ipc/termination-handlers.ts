import { ipcMain } from 'electron';
import { z } from 'zod';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { TerminationService } from '../services/termination-service';
import { toResult } from './helpers';

const terminationSchema = z.object({
  empleadoId: z.string().min(1),
  tipo: z.enum(['Voluntaria', 'Involuntaria', 'Fin de contrato', 'Jubilacion']),
  motivo: z.string().trim().min(1),
  fecha: z.string().min(1),
  observaciones: z.string(),
});

export function registerTerminationHandlers() {
  const terminationService = new TerminationService();

  ipcMain.handle(IPC_CHANNELS.terminationsList, async () =>
    toResult(async () => terminationService.list()),
  );
  ipcMain.handle(IPC_CHANNELS.terminationsCreate, async (_event, input) =>
    toResult(async () => terminationService.create(terminationSchema.parse(input))),
  );
}

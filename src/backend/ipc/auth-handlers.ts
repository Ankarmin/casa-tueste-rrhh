import { ipcMain } from 'electron';
import { z } from 'zod';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { AuthService } from '../services/auth-service';
import { toResult } from './helpers';

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export function registerAuthHandlers() {
  const authService = new AuthService();

  ipcMain.handle(IPC_CHANNELS.authLogin, async (_event, input) =>
    toResult(async () => authService.login(loginSchema.parse(input))),
  );
  ipcMain.handle(IPC_CHANNELS.authLogout, async () => toResult(async () => authService.logout()));
  ipcMain.handle(IPC_CHANNELS.authSession, async () => toResult(async () => authService.getSession()));
}

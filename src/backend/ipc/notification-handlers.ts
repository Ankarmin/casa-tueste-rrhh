import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { NotificationService } from '../services/notification-service';
import { toResult } from './helpers';

export function registerNotificationHandlers() {
  const notificationService = new NotificationService();

  ipcMain.handle(IPC_CHANNELS.notificationsList, async () =>
    toResult(async () => notificationService.list()),
  );
}

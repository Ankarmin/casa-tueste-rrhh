import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { DashboardService } from '../services/dashboard-service';
import { toResult } from './helpers';

export function registerDashboardHandlers() {
  const dashboardService = new DashboardService();

  ipcMain.handle(IPC_CHANNELS.dashboardSummary, async () =>
    toResult(async () => dashboardService.getSummary()),
  );
}

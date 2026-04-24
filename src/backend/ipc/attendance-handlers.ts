import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { AttendanceService } from '../services/attendance-service';
import { toResult } from './helpers';

export function registerAttendanceHandlers() {
  const attendanceService = new AttendanceService();

  ipcMain.handle(IPC_CHANNELS.attendancesToday, async () =>
    toResult(async () => attendanceService.listToday()),
  );
}

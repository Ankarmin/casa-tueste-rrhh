import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipc-types';
import { ContractService } from '../services/contract-service';
import { toResult } from './helpers';

export function registerContractHandlers() {
  const contractService = new ContractService();

  ipcMain.handle(IPC_CHANNELS.contractsList, async () => toResult(async () => contractService.list()));
  ipcMain.handle(IPC_CHANNELS.contractsGetById, async (_event, id: string) =>
    toResult(async () => contractService.getById(String(id))),
  );
}

import { contextBridge, ipcRenderer } from 'electron';
import type { CreateEmployeeInput, CreateTerminationInput, LoginInput } from './shared/dto';
import { IPC_CHANNELS } from './shared/ipc-types';

contextBridge.exposeInMainWorld('electronAPI', {
  auth: {
    login: (input: LoginInput) => ipcRenderer.invoke(IPC_CHANNELS.authLogin, input),
    logout: () => ipcRenderer.invoke(IPC_CHANNELS.authLogout),
    getSession: () => ipcRenderer.invoke(IPC_CHANNELS.authSession),
  },
  dashboard: {
    getSummary: () => ipcRenderer.invoke(IPC_CHANNELS.dashboardSummary),
  },
  notifications: {
    list: () => ipcRenderer.invoke(IPC_CHANNELS.notificationsList),
  },
  employees: {
    list: () => ipcRenderer.invoke(IPC_CHANNELS.employeesList),
    listActive: () => ipcRenderer.invoke(IPC_CHANNELS.employeesActive),
    getById: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.employeesGetById, id),
    create: (input: CreateEmployeeInput) => ipcRenderer.invoke(IPC_CHANNELS.employeesCreate, input),
  },
  contracts: {
    list: () => ipcRenderer.invoke(IPC_CHANNELS.contractsList),
    getById: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.contractsGetById, id),
  },
  attendances: {
    listToday: () => ipcRenderer.invoke(IPC_CHANNELS.attendancesToday),
  },
  terminations: {
    list: () => ipcRenderer.invoke(IPC_CHANNELS.terminationsList),
    create: (input: CreateTerminationInput) => ipcRenderer.invoke(IPC_CHANNELS.terminationsCreate, input),
  },
});

import type {
  AttendancesOverview,
  ContractDetail,
  ContractsOverview,
  CreateEmployeeInput,
  CreateTerminationInput,
  DashboardSummary,
  EmployeeDetailView,
  EmployeeListItem,
  LoginInput,
  NotificationItem,
  Result,
  SessionUser,
  TerminationsOverview,
} from './dto';

type ElectronAPI = {
  auth: {
    login: (input: LoginInput) => Promise<Result<SessionUser>>;
    logout: () => Promise<Result<boolean>>;
    getSession: () => Promise<Result<SessionUser | null>>;
  };
  dashboard: {
    getSummary: () => Promise<Result<DashboardSummary>>;
  };
  notifications: {
    list: () => Promise<Result<NotificationItem[]>>;
  };
  employees: {
    list: () => Promise<Result<EmployeeListItem[]>>;
    listActive: () => Promise<Result<Array<Pick<EmployeeListItem, 'id' | 'nombre' | 'puesto'>>>>;
    getById: (id: string) => Promise<Result<EmployeeDetailView | null>>;
    create: (input: CreateEmployeeInput) => Promise<Result<{ employeeId: string; contractId: string }>>;
  };
  contracts: {
    list: () => Promise<Result<ContractsOverview>>;
    getById: (id: string) => Promise<Result<ContractDetail | null>>;
  };
  attendances: {
    listToday: () => Promise<Result<AttendancesOverview>>;
  };
  terminations: {
    list: () => Promise<Result<TerminationsOverview>>;
    create: (input: CreateTerminationInput) => Promise<Result<{ terminationId: string }>>;
  };
};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};

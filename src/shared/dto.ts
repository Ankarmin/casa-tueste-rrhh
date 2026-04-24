export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type ContractStatus = 'vigente' | 'por_vencer' | 'vencido';
export type AttendanceStatus = 'presente' | 'tarde' | 'ausente' | 'permiso';
export type EmployeeStatus = 'activo' | 'baja';
export type TerminationType = 'Voluntaria' | 'Involuntaria' | 'Fin de contrato' | 'Jubilacion';
export type NotificationType = 'contrato' | 'asistencia' | 'empleado' | 'baja';

export type SessionUser = {
  username: string;
  nombre: string;
  rol: string;
  iniciales: string;
};

export type NotificationItem = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: NotificationType;
};

export type EmployeeSummary = {
  id: string;
  nombre: string;
  puesto: string;
  area: string;
  email: string;
  telefono: string;
  fechaIngreso: string;
  estado: EmployeeStatus;
  iniciales: string;
};

export type EmployeeListItem = EmployeeSummary;

export type EmployeeDetail = EmployeeSummary & {
  dni: string;
  direccion: string;
  departamento: string;
  distrito: string;
  fechaNacimiento: string;
  sexo: string;
  estadoCivil: string;
  nacionalidad: string;
};

export type ContractSummary = {
  id: string;
  empleadoId: string;
  tipo: string;
  inicio: string;
  fin: string;
  salario: number;
  estado: ContractStatus;
};

export type ContractListItem = ContractSummary & {
  empleado: Pick<EmployeeSummary, 'id' | 'nombre' | 'puesto' | 'area' | 'iniciales'>;
};

export type ContractDetail = ContractSummary & {
  empleado: Pick<EmployeeSummary, 'id' | 'nombre' | 'puesto' | 'area' | 'iniciales'>;
};

export type AttendanceListItem = {
  id: string;
  empleadoId: string;
  fecha: string;
  entrada: string;
  salida: string | null;
  estado: AttendanceStatus;
  empleado: Pick<EmployeeSummary, 'id' | 'nombre' | 'puesto' | 'iniciales'>;
};

export type TerminationListItem = {
  id: string;
  empleadoId: string;
  motivo: string;
  tipo: TerminationType;
  fecha: string;
  observaciones: string;
  empleado: Pick<EmployeeSummary, 'id' | 'nombre' | 'puesto'>;
};

export type DashboardSummary = {
  currentUser: SessionUser;
  kpis: {
    totalEmpleados: number;
    asistenciasHoy: number;
    contratosVigentes: number;
    contratosPorVencer: number;
  };
  recientes: AttendanceListItem[];
  proximosVencer: ContractListItem[];
};

export type EmployeeDetailView = {
  empleado: EmployeeDetail;
  contrato: ContractSummary | null;
  asistencia: Pick<AttendanceListItem, 'entrada' | 'estado'> | null;
};

export type ContractsOverview = {
  contratos: ContractListItem[];
  stats: {
    total: number;
    vigentes: number;
    porVencer: number;
    vencidos: number;
  };
};

export type AttendancesOverview = {
  asistencias: AttendanceListItem[];
  stats: {
    presentes: number;
    tardanzas: number;
    ausentes: number;
    programadosHoy: number;
  };
};

export type TerminationsOverview = {
  bajas: TerminationListItem[];
  activos: Array<Pick<EmployeeSummary, 'id' | 'nombre' | 'puesto'>>;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type CreateEmployeeInput = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  fechaNacimiento: string;
  sexo: string;
  estadoCivil: string;
  nacionalidad: string;
  email: string;
  telefono: string;
  departamento: string;
  distrito: string;
  direccion: string;
  puesto: string;
  area: string;
  fechaIngreso: string;
  salario: number;
  tipoContrato: string;
  regimen: string;
  jornada: string;
  sede: string;
  sistemaPensiones: string;
  cuspp: string;
  regimenSalud: string;
  ruc: string;
  banco: string;
  cci: string;
  emergenciaNombre: string;
  emergenciaParentesco: string;
  emergenciaTelefono: string;
  emergenciaNotas: string;
};

export type CreateTerminationInput = {
  empleadoId: string;
  tipo: TerminationType;
  motivo: string;
  fecha: string;
  observaciones: string;
};

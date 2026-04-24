export type Empleado = {
  id: string;
  nombre: string;
  puesto: string;
  area: string;
  email: string;
  telefono: string;
  fechaIngreso: string;
  estado: 'activo' | 'baja';
  iniciales: string;
};

export const currentUser = {
  nombre: 'David Pinarreta',
  rol: 'Gerente de RRHH',
  iniciales: 'DP',
};

export const empleados: Empleado[] = [
  {
    id: 'E-001',
    nombre: 'Maria Quispe',
    puesto: 'Barista Senior',
    area: 'Operaciones',
    email: 'maria.q@casatueste.pe',
    telefono: '+51 987 123 456',
    fechaIngreso: '2022-03-14',
    estado: 'activo',
    iniciales: 'MQ',
  },
  {
    id: 'E-002',
    nombre: 'Carlos Huaman',
    puesto: 'Tostador Principal',
    area: 'Produccion',
    email: 'carlos.h@casatueste.pe',
    telefono: '+51 986 234 567',
    fechaIngreso: '2021-08-02',
    estado: 'activo',
    iniciales: 'CH',
  },
  {
    id: 'E-003',
    nombre: 'Lucia Ramos',
    puesto: 'Cajera de tienda',
    area: 'Atencion',
    email: 'lucia.r@casatueste.pe',
    telefono: '+51 985 345 678',
    fechaIngreso: '2023-01-10',
    estado: 'activo',
    iniciales: 'LR',
  },
  {
    id: 'E-004',
    nombre: 'Andres Salazar',
    puesto: 'Repostero',
    area: 'Cocina',
    email: 'andres.s@casatueste.pe',
    telefono: '+51 984 456 789',
    fechaIngreso: '2022-11-21',
    estado: 'activo',
    iniciales: 'AS',
  },
  {
    id: 'E-005',
    nombre: 'Claudia Paredes',
    puesto: 'Administradora de sede',
    area: 'Direccion',
    email: 'claudia.p@casatueste.pe',
    telefono: '+51 983 567 890',
    fechaIngreso: '2020-05-18',
    estado: 'activo',
    iniciales: 'CP',
  },
  {
    id: 'E-006',
    nombre: 'Diego Cardenas',
    puesto: 'Mozo de salon',
    area: 'Atencion',
    email: 'diego.c@casatueste.pe',
    telefono: '+51 982 678 901',
    fechaIngreso: '2023-06-04',
    estado: 'activo',
    iniciales: 'DC',
  },
  {
    id: 'E-007',
    nombre: 'Patricia Leon',
    puesto: 'Barista Junior',
    area: 'Operaciones',
    email: 'patricia.l@casatueste.pe',
    telefono: '+51 981 789 012',
    fechaIngreso: '2024-02-15',
    estado: 'activo',
    iniciales: 'PL',
  },
  {
    id: 'E-008',
    nombre: 'Roberto Nunez',
    puesto: 'Encargado de Almacen',
    area: 'Logistica',
    email: 'roberto.n@casatueste.pe',
    telefono: '+51 980 890 123',
    fechaIngreso: '2019-09-30',
    estado: 'baja',
    iniciales: 'RN',
  },
];

export type Asistencia = {
  empleadoId: string;
  fecha: string;
  entrada: string;
  salida: string | null;
  estado: 'presente' | 'tarde' | 'ausente' | 'permiso';
};

export const asistenciasHoy: Asistencia[] = [
  { empleadoId: 'E-001', fecha: '2026-04-22', entrada: '07:02', salida: '15:05', estado: 'presente' },
  { empleadoId: 'E-002', fecha: '2026-04-22', entrada: '06:55', salida: '14:58', estado: 'presente' },
  { empleadoId: 'E-003', fecha: '2026-04-22', entrada: '08:18', salida: null, estado: 'tarde' },
  { empleadoId: 'E-004', fecha: '2026-04-22', entrada: '07:00', salida: null, estado: 'presente' },
  { empleadoId: 'E-005', fecha: '2026-04-22', entrada: '09:00', salida: null, estado: 'presente' },
  { empleadoId: 'E-006', fecha: '2026-04-22', entrada: '-', salida: null, estado: 'ausente' },
  { empleadoId: 'E-007', fecha: '2026-04-22', entrada: '-', salida: null, estado: 'permiso' },
];

export type Contrato = {
  id: string;
  empleadoId: string;
  tipo: 'Indefinido' | 'Temporal' | 'Capacitacion' | 'Por Obra';
  inicio: string;
  fin: string;
  salario: number;
  estado: 'vigente' | 'por_vencer' | 'vencido';
};

export const contratos: Contrato[] = [
  { id: 'C-1001', empleadoId: 'E-001', tipo: 'Indefinido', inicio: '2022-03-14', fin: '2027-03-14', salario: 2600, estado: 'vigente' },
  { id: 'C-1002', empleadoId: 'E-002', tipo: 'Indefinido', inicio: '2021-08-02', fin: '2026-08-02', salario: 4200, estado: 'vigente' },
  { id: 'C-1003', empleadoId: 'E-003', tipo: 'Temporal', inicio: '2023-01-10', fin: '2026-05-10', salario: 1800, estado: 'por_vencer' },
  { id: 'C-1004', empleadoId: 'E-004', tipo: 'Indefinido', inicio: '2022-11-21', fin: '2027-11-21', salario: 2400, estado: 'vigente' },
  { id: 'C-1005', empleadoId: 'E-005', tipo: 'Indefinido', inicio: '2020-05-18', fin: '2028-05-18', salario: 5800, estado: 'vigente' },
  { id: 'C-1006', empleadoId: 'E-006', tipo: 'Capacitacion', inicio: '2023-06-04', fin: '2026-04-30', salario: 1600, estado: 'por_vencer' },
  { id: 'C-1007', empleadoId: 'E-007', tipo: 'Temporal', inicio: '2024-02-15', fin: '2025-12-31', salario: 1700, estado: 'vencido' },
];

export type Baja = {
  id: string;
  empleadoId: string;
  motivo: string;
  tipo: 'Voluntaria' | 'Involuntaria' | 'Fin de contrato' | 'Jubilacion';
  fecha: string;
  observaciones: string;
};

export const bajas: Baja[] = [
  {
    id: 'B-301',
    empleadoId: 'E-008',
    motivo: 'Mudanza a provincia',
    tipo: 'Voluntaria',
    fecha: '2025-11-04',
    observaciones: 'Renuncia con preaviso de 15 dias. Entrega de inventario y cierre de almacen completados.',
  },
];

export type Notificacion = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: 'contrato' | 'asistencia' | 'empleado' | 'baja';
};

export const notificaciones: Notificacion[] = [
  {
    id: 'N-001',
    titulo: 'Contrato por renovar',
    descripcion: 'Lucia Ramos tiene contrato temporal con vencimiento el 2026-05-10 en la sede Miraflores.',
    fecha: 'Hace 2 horas',
    tipo: 'contrato',
  },
  {
    id: 'N-002',
    titulo: 'Incidencia de asistencia',
    descripcion: 'Diego Cardenas figura como ausente en la jornada de hoy y requiere revision administrativa.',
    fecha: 'Hace 4 horas',
    tipo: 'asistencia',
  },
  {
    id: 'N-003',
    titulo: 'Alta pendiente de completar',
    descripcion: 'El expediente del nuevo colaborador de Operaciones aun no tiene cuenta interbancaria registrada.',
    fecha: 'Ayer',
    tipo: 'empleado',
  },
  {
    id: 'N-004',
    titulo: 'Baja registrada',
    descripcion: 'Se genero correctamente el expediente de salida de Roberto Nunez.',
    fecha: 'Ayer',
    tipo: 'baja',
  },
];

export const kpis = {
  totalEmpleados: empleados.filter((empleado) => empleado.estado === 'activo').length,
  asistenciasHoy: asistenciasHoy.filter(
    (asistencia) => asistencia.estado === 'presente' || asistencia.estado === 'tarde',
  ).length,
  contratosVigentes: contratos.filter((contrato) => contrato.estado === 'vigente').length,
  contratosPorVencer: contratos.filter((contrato) => contrato.estado === 'por_vencer').length,
};

export const empleadoPorId = (id: string) => empleados.find((empleado) => empleado.id === id);

export const contratoPorId = (id: string) => contratos.find((contrato) => contrato.id === id);

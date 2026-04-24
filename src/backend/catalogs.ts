export const puestoLabels: Record<string, string> = {
  barista: 'Barista',
  tostador: 'Tostador',
  cajero: 'Cajero / Cajera',
  mesero: 'Mozo / Moza',
  repostero: 'Repostero',
  almacen: 'Encargado de almacen',
  gerente: 'Administrador / Gerente',
};

export const areaLabels: Record<string, string> = {
  ops: 'Operaciones',
  prod: 'Produccion',
  atn: 'Atencion al cliente',
  cocina: 'Cocina',
  logistica: 'Logistica',
  dir: 'Direccion',
};

export const contractTypeLabels: Record<string, string> = {
  indef: 'Indefinido',
  plazo: 'Temporal',
  parcial: 'Temporal',
  practicas: 'Capacitacion',
  obra: 'Por Obra',
};

export const regimenLabels: Record<string, string> = {
  general: 'Regimen general',
  mype: 'MYPE',
  rxh: 'Recibo por honorarios',
};

export const jornadaLabels: Record<string, string> = {
  completa: 'Tiempo completo (48 h)',
  parcial: 'Tiempo parcial',
  rotativa: 'Turnos rotativos',
};

export const sedeLabels: Record<string, string> = {
  miraflores: 'Casa Tueste · Miraflores',
  barranco: 'Casa Tueste · Barranco',
  sanisidro: 'Casa Tueste · San Isidro',
  surco: 'Casa Tueste · Surco',
};

export const terminationTypeLabels: Record<string, 'Voluntaria' | 'Involuntaria' | 'Fin de contrato' | 'Jubilacion'> = {
  vol: 'Voluntaria',
  invol: 'Involuntaria',
  fin: 'Fin de contrato',
  jub: 'Jubilacion',
};

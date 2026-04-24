import type {
  AttendanceListItem,
  ContractDetail,
  ContractListItem,
  ContractSummary,
  EmployeeDetail,
  EmployeeListItem,
  NotificationItem,
  SessionUser,
  TerminationListItem,
} from '../shared/dto';
import { AttendanceEntity } from './entities/attendance.entity';
import { ContractEntity } from './entities/contract.entity';
import { EmployeeEntity } from './entities/employee.entity';
import { NotificationEntity } from './entities/notification.entity';
import { TerminationEntity } from './entities/termination.entity';
import { UserEntity } from './entities/user.entity';
import { fullName } from './utils';

export function mapUserSession(user: UserEntity): SessionUser {
  return {
    username: user.username,
    nombre: user.nombre,
    rol: user.rol,
    iniciales: user.iniciales,
  };
}

export function mapEmployeeSummary(employee: EmployeeEntity): EmployeeListItem {
  return {
    id: employee.id,
    nombre: fullName(employee.nombres, employee.apellidoPaterno, employee.apellidoMaterno),
    puesto: employee.puesto,
    area: employee.area,
    email: employee.email,
    telefono: employee.telefono,
    fechaIngreso: employee.fechaIngreso,
    estado: employee.estado,
    iniciales: employee.iniciales,
  };
}

export function mapEmployeeDetail(employee: EmployeeEntity): EmployeeDetail {
  return {
    ...mapEmployeeSummary(employee),
    dni: employee.dni,
    direccion: employee.direccion,
    departamento: employee.departamento,
    distrito: employee.distrito,
    fechaNacimiento: employee.fechaNacimiento,
    sexo: employee.sexo,
    estadoCivil: employee.estadoCivil,
    nacionalidad: employee.nacionalidad,
  };
}

export function mapContractSummary(contract: ContractEntity): ContractSummary {
  return {
    id: contract.id,
    empleadoId: contract.employeeId,
    tipo: contract.tipo,
    inicio: contract.inicio,
    fin: contract.fin,
    salario: contract.salario,
    estado: contract.estado,
  };
}

export function mapContractListItem(contract: ContractEntity, employee: EmployeeEntity): ContractListItem {
  return {
    ...mapContractSummary(contract),
    empleado: {
      id: employee.id,
      nombre: fullName(employee.nombres, employee.apellidoPaterno, employee.apellidoMaterno),
      puesto: employee.puesto,
      area: employee.area,
      iniciales: employee.iniciales,
    },
  };
}

export function mapContractDetail(contract: ContractEntity, employee: EmployeeEntity): ContractDetail {
  return mapContractListItem(contract, employee);
}

export function mapAttendanceListItem(attendance: AttendanceEntity, employee: EmployeeEntity): AttendanceListItem {
  return {
    id: attendance.id,
    empleadoId: attendance.employeeId,
    fecha: attendance.fecha,
    entrada: attendance.entrada,
    salida: attendance.salida,
    estado: attendance.estado,
    empleado: {
      id: employee.id,
      nombre: fullName(employee.nombres, employee.apellidoPaterno, employee.apellidoMaterno),
      puesto: employee.puesto,
      iniciales: employee.iniciales,
    },
  };
}

export function mapTerminationListItem(termination: TerminationEntity, employee: EmployeeEntity): TerminationListItem {
  return {
    id: termination.id,
    empleadoId: termination.employeeId,
    motivo: termination.motivo,
    tipo: termination.tipo,
    fecha: termination.fecha,
    observaciones: termination.observaciones,
    empleado: {
      id: employee.id,
      nombre: fullName(employee.nombres, employee.apellidoPaterno, employee.apellidoMaterno),
      puesto: employee.puesto,
    },
  };
}

export function mapNotification(notification: NotificationEntity): NotificationItem {
  return {
    id: notification.id,
    titulo: notification.titulo,
    descripcion: notification.descripcion,
    fecha: notification.fecha,
    tipo: notification.tipo,
  };
}

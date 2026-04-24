import { AppDataSource } from '../db/data-source';
import { EmployeeEmergencyContactEntity } from '../entities/employee-emergency-contact.entity';
import { EmployeePayrollEntity } from '../entities/employee-payroll.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { ContractEntity } from '../entities/contract.entity';
import { NotificationEntity } from '../entities/notification.entity';
import type { CreateEmployeeInput } from '../../shared/dto';
import { areaLabels, contractTypeLabels, jornadaLabels, puestoLabels, regimenLabels, sedeLabels } from '../catalogs';
import { mapEmployeeDetail, mapEmployeeSummary, mapContractSummary } from '../mappers';
import { codeNumber, computeContractStatus, fullName, makeInitials, padCode } from '../utils';
import { AttendanceEntity } from '../entities/attendance.entity';

function addYears(dateValue: string, years: number) {
  const date = new Date(dateValue);
  date.setFullYear(date.getFullYear() + years);
  return date.toISOString().slice(0, 10);
}

function contractEndDate(tipoContrato: string, fechaIngreso: string) {
  if (tipoContrato === 'indef') {
    return addYears(fechaIngreso, 5);
  }

  return addYears(fechaIngreso, 1);
}

export class EmployeeService {
  async list() {
    const repository = AppDataSource.getRepository(EmployeeEntity);
    const employees = await repository.find({ order: { id: 'ASC' } });
    return employees.map(mapEmployeeSummary);
  }

  async listActive() {
    const repository = AppDataSource.getRepository(EmployeeEntity);
    const employees = await repository.find({ where: { estado: 'activo' }, order: { id: 'ASC' } });
    return employees.map((employee) => ({
      id: employee.id,
      nombre: fullName(employee.nombres, employee.apellidoPaterno, employee.apellidoMaterno),
      puesto: employee.puesto,
    }));
  }

  async getById(id: string) {
    const employeeRepository = AppDataSource.getRepository(EmployeeEntity);
    const contractRepository = AppDataSource.getRepository(ContractEntity);
    const attendanceRepository = AppDataSource.getRepository(AttendanceEntity);

    const employee = await employeeRepository.findOne({ where: { id } });

    if (!employee) {
      return null;
    }

    const contract = await contractRepository.findOne({
      where: { employeeId: id },
      order: { fin: 'DESC' },
    });
    const attendance = await attendanceRepository.findOne({
      where: { employeeId: id },
      order: { fecha: 'DESC' },
    });

    return {
      empleado: mapEmployeeDetail(employee),
      contrato: contract ? mapContractSummary(contract) : null,
      asistencia: attendance ? { entrada: attendance.entrada, estado: attendance.estado } : null,
    };
  }

  async create(input: CreateEmployeeInput) {
    return AppDataSource.transaction(async (manager) => {
      const employeeIds = await manager.find(EmployeeEntity, { select: { id: true } });
      const contractIds = await manager.find(ContractEntity, { select: { id: true } });
      const notificationIds = await manager.find(NotificationEntity, { select: { id: true } });

      const employeeId = padCode(
        'E',
        employeeIds.reduce((max, item) => Math.max(max, codeNumber(item.id)), 0) + 1,
      );
      const contractId = padCode(
        'C',
        contractIds.reduce((max, item) => Math.max(max, codeNumber(item.id)), 0) + 1,
      );
      const notificationId = padCode(
        'N',
        notificationIds.reduce((max, item) => Math.max(max, codeNumber(item.id)), 0) + 1,
      );

      const puesto = puestoLabels[input.puesto] ?? input.puesto;
      const area = areaLabels[input.area] ?? input.area;
      const tipoContrato = contractTypeLabels[input.tipoContrato] ?? input.tipoContrato;
      const regimen = regimenLabels[input.regimen] ?? input.regimen;
      const jornada = jornadaLabels[input.jornada] ?? input.jornada;
      const sede = sedeLabels[input.sede] ?? input.sede;

      const employee = manager.create(EmployeeEntity, {
        id: employeeId,
        nombres: input.nombres.trim(),
        apellidoPaterno: input.apellidoPaterno.trim(),
        apellidoMaterno: input.apellidoMaterno.trim(),
        dni: input.dni.trim(),
        fechaNacimiento: input.fechaNacimiento,
        sexo: input.sexo,
        estadoCivil: input.estadoCivil,
        nacionalidad: input.nacionalidad.trim(),
        email: input.email.trim(),
        telefono: input.telefono.trim(),
        departamento: input.departamento,
        distrito: input.distrito.trim(),
        direccion: input.direccion.trim(),
        puesto,
        area,
        sede,
        fechaIngreso: input.fechaIngreso,
        estado: 'activo',
        iniciales: makeInitials(input.nombres, input.apellidoPaterno),
      });

      const payroll = manager.create(EmployeePayrollEntity, {
        employeeId,
        sistemaPensiones: input.sistemaPensiones,
        cuspp: input.cuspp.trim(),
        regimenSalud: input.regimenSalud,
        ruc: input.ruc.trim(),
        banco: input.banco,
        cci: input.cci.trim(),
      });

      const emergencyContact = manager.create(EmployeeEmergencyContactEntity, {
        employeeId,
        nombre: input.emergenciaNombre.trim(),
        parentesco: input.emergenciaParentesco.trim(),
        telefono: input.emergenciaTelefono.trim(),
        notas: input.emergenciaNotas.trim(),
      });

      const endDate = contractEndDate(input.tipoContrato, input.fechaIngreso);
      const contract = manager.create(ContractEntity, {
        id: contractId,
        employeeId,
        tipo: tipoContrato,
        regimen,
        jornada,
        inicio: input.fechaIngreso,
        fin: endDate,
        salario: input.salario,
        estado: computeContractStatus(endDate),
      });

      const notification = manager.create(NotificationEntity, {
        id: notificationId,
        titulo: 'Alta registrada',
        descripcion: `Se registro correctamente el expediente de ${fullName(input.nombres, input.apellidoPaterno, input.apellidoMaterno)}.`,
        fecha: 'Ahora',
        tipo: 'empleado',
      });

      await manager.save(employee);
      await manager.save(payroll);
      await manager.save(emergencyContact);
      await manager.save(contract);
      await manager.save(notification);

      return { employeeId, contractId };
    });
  }
}

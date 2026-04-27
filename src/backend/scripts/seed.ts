import bcrypt from 'bcryptjs';
import { initializeDatabase } from '../db/data-source';
import { AttendanceEntity } from '../entities/attendance.entity';
import { ContractEntity } from '../entities/contract.entity';
import { EmployeeEmergencyContactEntity } from '../entities/employee-emergency-contact.entity';
import { EmployeePayrollEntity } from '../entities/employee-payroll.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { NotificationEntity } from '../entities/notification.entity';
import { TerminationEntity } from '../entities/termination.entity';
import { UserEntity } from '../entities/user.entity';
import { asistenciasHoy, bajas, contratos, currentUser, empleados, notificaciones } from '../../lib/mock-data';
import { computeContractStatus, makeInitials, parseEmployeeName } from '../utils';

async function main() {
  const dataSource = await initializeDatabase();
  await dataSource.transaction(async (manager) => {
    await manager.getRepository(UserEntity).upsert(
      {
        username: 'modulo.rrhh@casatueste.pe',
        passwordHash: await bcrypt.hash('rrhh', 10),
        nombre: currentUser.nombre,
        rol: currentUser.rol,
        iniciales: currentUser.iniciales,
      },
      ['username'],
    );

    await manager.getRepository(EmployeeEntity).upsert(
      empleados.map((employee, index) => {
        const parsed = parseEmployeeName(employee.nombre);

        return {
          id: employee.id,
          nombres: parsed.nombres,
          apellidoPaterno: parsed.apellidoPaterno || `Apellido${index + 1}`,
          apellidoMaterno: parsed.apellidoMaterno,
          dni: String(73000000 + index),
          fechaNacimiento: `199${index % 10}-01-15`,
          sexo: index % 2 === 0 ? 'f' : 'm',
          estadoCivil: 'soltero',
          nacionalidad: 'Peruana',
          email: employee.email,
          telefono: employee.telefono,
          departamento: 'lima',
          distrito: 'Miraflores',
          direccion: 'Direccion registrada en expediente',
          puesto: employee.puesto,
          area: employee.area,
          sede: 'Casa Tueste · Miraflores',
          fechaIngreso: employee.fechaIngreso,
          estado: employee.estado,
          iniciales: employee.iniciales || makeInitials(parsed.nombres, parsed.apellidoPaterno),
        };
      }),
      ['id'],
    );

    await manager.getRepository(EmployeePayrollEntity).upsert(
      empleados.map((employee) => ({
        employeeId: employee.id,
        sistemaPensiones: 'ONP',
        cuspp: '',
        regimenSalud: 'EsSalud',
        ruc: '',
        banco: 'BCP',
        cci: '',
      })),
      ['employeeId'],
    );

    await manager.getRepository(EmployeeEmergencyContactEntity).upsert(
      empleados.map((employee) => ({
        employeeId: employee.id,
        nombre: `Contacto ${employee.iniciales}`,
        parentesco: 'Familiar',
        telefono: employee.telefono,
        notas: '',
      })),
      ['employeeId'],
    );

    await manager.getRepository(ContractEntity).upsert(
      contratos.map((contract) => ({
        id: contract.id,
        employeeId: contract.empleadoId,
        tipo: contract.tipo,
        regimen: 'Regimen general',
        jornada: 'Tiempo completo (48 h)',
        inicio: contract.inicio,
        fin: contract.fin,
        salario: contract.salario,
        estado: contract.estado || computeContractStatus(contract.fin),
      })),
      ['id'],
    );

    const attendanceRepository = manager.getRepository(AttendanceEntity);
    const existingAttendances = await attendanceRepository.find({
      select: { id: true, employeeId: true, fecha: true },
    });
    const attendanceIdsByKey = new Map(
      existingAttendances.map((attendance) => [`${attendance.employeeId}:${attendance.fecha}`, attendance.id]),
    );

    await attendanceRepository.save(
      asistenciasHoy.map((attendance) => ({
        id: attendanceIdsByKey.get(`${attendance.empleadoId}:${attendance.fecha}`),
        employeeId: attendance.empleadoId,
        fecha: attendance.fecha,
        entrada: attendance.entrada,
        salida: attendance.salida,
        estado: attendance.estado,
      })),
    );

    await manager.getRepository(TerminationEntity).upsert(
      bajas.map((termination) => ({
        id: termination.id,
        employeeId: termination.empleadoId,
        motivo: termination.motivo,
        tipo: termination.tipo,
        fecha: termination.fecha,
        observaciones: termination.observaciones,
      })),
      ['id'],
    );

    await manager.getRepository(NotificationEntity).upsert(
      notificaciones.map((notification) => ({
        id: notification.id,
        titulo: notification.titulo,
        descripcion: notification.descripcion,
        fecha: notification.fecha,
        tipo: notification.tipo,
      })),
      ['id'],
    );
  });

  await dataSource.destroy();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

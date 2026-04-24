import type { CreateTerminationInput } from '../../shared/dto';
import { AppDataSource } from '../db/data-source';
import { NotificationEntity } from '../entities/notification.entity';
import { TerminationEntity } from '../entities/termination.entity';
import { mapTerminationListItem } from '../mappers';
import { codeNumber, padCode } from '../utils';
import { EmployeeEntity } from '../entities/employee.entity';

export class TerminationService {
  async list() {
    const terminations = await AppDataSource.getRepository(TerminationEntity).find({
      relations: { employee: true },
      order: { fecha: 'DESC', id: 'DESC' },
    });
    const activos = await AppDataSource.getRepository(EmployeeEntity).find({
      where: { estado: 'activo' },
      order: { id: 'ASC' },
    });

    return {
      bajas: terminations.map((termination) => mapTerminationListItem(termination, termination.employee)),
      activos: activos.map((employee) => ({
        id: employee.id,
        nombre: [employee.nombres, employee.apellidoPaterno, employee.apellidoMaterno].filter(Boolean).join(' '),
        puesto: employee.puesto,
      })),
    };
  }

  async create(input: CreateTerminationInput) {
    return AppDataSource.transaction(async (manager) => {
      const employee = await manager.findOne(EmployeeEntity, { where: { id: input.empleadoId } });

      if (!employee) {
        throw new Error('No se encontro el colaborador seleccionado.');
      }

      const terminationIds = await manager.find(TerminationEntity, { select: { id: true } });
      const notificationIds = await manager.find(NotificationEntity, { select: { id: true } });

      const terminationId = padCode(
        'B',
        terminationIds.reduce((max, item) => Math.max(max, codeNumber(item.id)), 0) + 1,
      );
      const notificationId = padCode(
        'N',
        notificationIds.reduce((max, item) => Math.max(max, codeNumber(item.id)), 0) + 1,
      );

      await manager.save(
        manager.create(TerminationEntity, {
          id: terminationId,
          employeeId: input.empleadoId,
          motivo: input.motivo.trim(),
          tipo: input.tipo,
          fecha: input.fecha,
          observaciones: input.observaciones.trim(),
        }),
      );

      employee.estado = 'baja';
      await manager.save(employee);

      await manager.save(
        manager.create(NotificationEntity, {
          id: notificationId,
          titulo: 'Baja registrada',
          descripcion: `Se genero correctamente el expediente de salida de ${employee.nombres} ${employee.apellidoPaterno}.`,
          fecha: 'Ahora',
          tipo: 'baja',
        }),
      );

      return { terminationId };
    });
  }
}

import { AppDataSource } from '../db/data-source';
import { AttendanceEntity } from '../entities/attendance.entity';
import { mapAttendanceListItem } from '../mappers';

export class AttendanceService {
  async listToday() {
    const repository = AppDataSource.getRepository(AttendanceEntity);
    const attendances = await repository.find({ relations: { employee: true }, order: { employeeId: 'ASC' } });

    return {
      asistencias: attendances.map((attendance) => mapAttendanceListItem(attendance, attendance.employee)),
      stats: {
        presentes: attendances.filter((attendance) => attendance.estado === 'presente').length,
        tardanzas: attendances.filter((attendance) => attendance.estado === 'tarde').length,
        ausentes: attendances.filter((attendance) => attendance.estado === 'ausente').length,
        programadosHoy: attendances.length,
      },
    };
  }
}

import { AuthService } from './auth-service';
import { AttendanceService } from './attendance-service';
import { ContractService } from './contract-service';
import { AppDataSource } from '../db/data-source';
import { EmployeeEntity } from '../entities/employee.entity';

export class DashboardService {
  private readonly authService = new AuthService();
  private readonly attendanceService = new AttendanceService();
  private readonly contractService = new ContractService();

  async getSummary() {
    const currentUser = await this.authService.getSession();

    if (!currentUser) {
      throw new Error('No hay una sesion activa.');
    }

    const [attendances, contracts, totalEmpleados] = await Promise.all([
      this.attendanceService.listToday(),
      this.contractService.list(),
      AppDataSource.getRepository(EmployeeEntity).count({ where: { estado: 'activo' } }),
    ]);

    return {
      currentUser,
      kpis: {
        totalEmpleados,
        asistenciasHoy: attendances.asistencias.filter(
          (attendance) => attendance.estado === 'presente' || attendance.estado === 'tarde',
        ).length,
        contratosVigentes: contracts.stats.vigentes,
        contratosPorVencer: contracts.stats.porVencer,
      },
      recientes: attendances.asistencias.slice(0, 5),
      proximosVencer: contracts.contratos.filter((contract) => contract.estado === 'por_vencer').slice(0, 5),
    };
  }
}

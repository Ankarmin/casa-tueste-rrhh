import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../env';
import { AttendanceEntity } from '../entities/attendance.entity';
import { ContractEntity } from '../entities/contract.entity';
import { EmployeeEmergencyContactEntity } from '../entities/employee-emergency-contact.entity';
import { EmployeePayrollEntity } from '../entities/employee-payroll.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { NotificationEntity } from '../entities/notification.entity';
import { TerminationEntity } from '../entities/termination.entity';
import { UserEntity } from '../entities/user.entity';
import { InitSchema1714000000000 } from './migrations/0001-init';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...(env.url
    ? {
        url: env.url,
      }
    : {
        host: env.host,
        port: env.port,
        username: env.username,
        password: env.password,
        database: env.database,
      }),
  ssl: env.ssl ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    EmployeeEntity,
    EmployeePayrollEntity,
    EmployeeEmergencyContactEntity,
    ContractEntity,
    AttendanceEntity,
    TerminationEntity,
    NotificationEntity,
  ],
  migrations: [InitSchema1714000000000],
});

export async function initializeDatabase() {
  if (AppDataSource.isInitialized) {
    return AppDataSource;
  }

  await AppDataSource.initialize();
  return AppDataSource;
}

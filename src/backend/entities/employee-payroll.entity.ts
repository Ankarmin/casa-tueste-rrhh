import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'employee_payroll_profiles' })
export class EmployeePayrollEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'employee_id', unique: true })
  employeeId!: string;

  @Column({ type: 'varchar', name: 'sistema_pensiones' })
  sistemaPensiones!: string;

  @Column({ type: 'varchar', default: '' })
  cuspp!: string;

  @Column({ type: 'varchar', name: 'regimen_salud' })
  regimenSalud!: string;

  @Column({ type: 'varchar', default: '' })
  ruc!: string;

  @Column({ type: 'varchar', default: '' })
  banco!: string;

  @Column({ type: 'varchar', default: '' })
  cci!: string;

  @OneToOne(() => EmployeeEntity, (employee) => employee.payroll, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: EmployeeEntity;
}

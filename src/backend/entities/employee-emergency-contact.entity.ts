import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'employee_emergency_contacts' })
export class EmployeeEmergencyContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'employee_id', unique: true })
  employeeId!: string;

  @Column({ type: 'varchar', default: '' })
  nombre!: string;

  @Column({ type: 'varchar', default: '' })
  parentesco!: string;

  @Column({ type: 'varchar', default: '' })
  telefono!: string;

  @Column({ type: 'text', default: '' })
  notas!: string;

  @OneToOne(() => EmployeeEntity, (employee) => employee.emergencyContact, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: EmployeeEntity;
}

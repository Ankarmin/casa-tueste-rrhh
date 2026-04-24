import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'attendances' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'employee_id' })
  employeeId!: string;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'varchar' })
  entrada!: string;

  @Column({ type: 'varchar', nullable: true })
  salida!: string | null;

  @Column({ type: 'varchar' })
  estado!: 'presente' | 'tarde' | 'ausente' | 'permiso';

  @ManyToOne(() => EmployeeEntity, (employee) => employee.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: EmployeeEntity;
}

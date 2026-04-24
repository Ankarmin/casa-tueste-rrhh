import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'terminations' })
export class TerminationEntity {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar', name: 'employee_id' })
  employeeId!: string;

  @Column({ type: 'varchar' })
  motivo!: string;

  @Column({ type: 'varchar' })
  tipo!: 'Voluntaria' | 'Involuntaria' | 'Fin de contrato' | 'Jubilacion';

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'text' })
  observaciones!: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.terminations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: EmployeeEntity;
}

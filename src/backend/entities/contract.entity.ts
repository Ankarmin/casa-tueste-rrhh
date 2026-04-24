import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'contracts' })
export class ContractEntity {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar', name: 'employee_id' })
  employeeId!: string;

  @Column({ type: 'varchar' })
  tipo!: string;

  @Column({ type: 'varchar' })
  regimen!: string;

  @Column({ type: 'varchar' })
  jornada!: string;

  @Column({ type: 'date' })
  inicio!: string;

  @Column({ type: 'date' })
  fin!: string;

  @Column({ type: 'integer' })
  salario!: number;

  @Column({ type: 'varchar' })
  estado!: 'vigente' | 'por_vencer' | 'vencido';

  @ManyToOne(() => EmployeeEntity, (employee) => employee.contracts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: EmployeeEntity;
}

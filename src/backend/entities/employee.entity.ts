import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { ContractEntity } from './contract.entity';
import { EmployeeEmergencyContactEntity } from './employee-emergency-contact.entity';
import { EmployeePayrollEntity } from './employee-payroll.entity';
import { TerminationEntity } from './termination.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar', name: 'nombres' })
  nombres!: string;

  @Column({ type: 'varchar', name: 'apellido_paterno' })
  apellidoPaterno!: string;

  @Column({ type: 'varchar', name: 'apellido_materno' })
  apellidoMaterno!: string;

  @Column({ type: 'varchar', unique: true })
  dni!: string;

  @Column({ name: 'fecha_nacimiento', type: 'date' })
  fechaNacimiento!: string;

  @Column({ type: 'varchar' })
  sexo!: string;

  @Column({ type: 'varchar', name: 'estado_civil' })
  estadoCivil!: string;

  @Column({ type: 'varchar' })
  nacionalidad!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  telefono!: string;

  @Column({ type: 'varchar' })
  departamento!: string;

  @Column({ type: 'varchar' })
  distrito!: string;

  @Column({ type: 'varchar' })
  direccion!: string;

  @Column({ type: 'varchar' })
  puesto!: string;

  @Column({ type: 'varchar' })
  area!: string;

  @Column({ type: 'varchar' })
  sede!: string;

  @Column({ name: 'fecha_ingreso', type: 'date' })
  fechaIngreso!: string;

  @Column({ type: 'varchar' })
  estado!: 'activo' | 'baja';

  @Column({ type: 'varchar' })
  iniciales!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToOne(() => EmployeePayrollEntity, (payroll) => payroll.employee)
  payroll?: EmployeePayrollEntity;

  @OneToOne(() => EmployeeEmergencyContactEntity, (contact) => contact.employee)
  emergencyContact?: EmployeeEmergencyContactEntity;

  @OneToMany(() => ContractEntity, (contract) => contract.employee)
  contracts?: ContractEntity[];

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.employee)
  attendances?: AttendanceEntity[];

  @OneToMany(() => TerminationEntity, (termination) => termination.employee)
  terminations?: TerminationEntity[];
}

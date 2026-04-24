import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar' })
  titulo!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'varchar' })
  fecha!: string;

  @Column({ type: 'varchar' })
  tipo!: 'contrato' | 'asistencia' | 'empleado' | 'baja';

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

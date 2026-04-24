import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1714000000000 implements MigrationInterface {
  name = 'InitSchema1714000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await queryRunner.query(`
      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        username varchar(255) NOT NULL UNIQUE,
        password_hash varchar(255) NOT NULL,
        nombre varchar(255) NOT NULL,
        rol varchar(255) NOT NULL,
        iniciales varchar(16) NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE employees (
        id varchar(32) PRIMARY KEY,
        nombres varchar(255) NOT NULL,
        apellido_paterno varchar(255) NOT NULL,
        apellido_materno varchar(255) NOT NULL,
        dni varchar(32) NOT NULL UNIQUE,
        fecha_nacimiento date NOT NULL,
        sexo varchar(64) NOT NULL,
        estado_civil varchar(64) NOT NULL,
        nacionalidad varchar(128) NOT NULL,
        email varchar(255) NOT NULL,
        telefono varchar(64) NOT NULL,
        departamento varchar(128) NOT NULL,
        distrito varchar(128) NOT NULL,
        direccion varchar(255) NOT NULL,
        puesto varchar(255) NOT NULL,
        area varchar(255) NOT NULL,
        sede varchar(255) NOT NULL,
        fecha_ingreso date NOT NULL,
        estado varchar(16) NOT NULL,
        iniciales varchar(16) NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE employee_payroll_profiles (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id varchar(32) NOT NULL UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
        sistema_pensiones varchar(255) NOT NULL,
        cuspp varchar(255) NOT NULL DEFAULT '',
        regimen_salud varchar(255) NOT NULL,
        ruc varchar(32) NOT NULL DEFAULT '',
        banco varchar(128) NOT NULL DEFAULT '',
        cci varchar(64) NOT NULL DEFAULT ''
      )
    `);
    await queryRunner.query(`
      CREATE TABLE employee_emergency_contacts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id varchar(32) NOT NULL UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
        nombre varchar(255) NOT NULL DEFAULT '',
        parentesco varchar(255) NOT NULL DEFAULT '',
        telefono varchar(64) NOT NULL DEFAULT '',
        notas text NOT NULL DEFAULT ''
      )
    `);
    await queryRunner.query(`
      CREATE TABLE contracts (
        id varchar(32) PRIMARY KEY,
        employee_id varchar(32) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        tipo varchar(255) NOT NULL,
        regimen varchar(255) NOT NULL,
        jornada varchar(255) NOT NULL,
        inicio date NOT NULL,
        fin date NOT NULL,
        salario integer NOT NULL,
        estado varchar(16) NOT NULL
      )
    `);
    await queryRunner.query(`
      CREATE TABLE attendances (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_id varchar(32) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        fecha date NOT NULL,
        entrada varchar(16) NOT NULL,
        salida varchar(16),
        estado varchar(16) NOT NULL
      )
    `);
    await queryRunner.query(`
      CREATE TABLE terminations (
        id varchar(32) PRIMARY KEY,
        employee_id varchar(32) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        motivo varchar(255) NOT NULL,
        tipo varchar(64) NOT NULL,
        fecha date NOT NULL,
        observaciones text NOT NULL
      )
    `);
    await queryRunner.query(`
      CREATE TABLE notifications (
        id varchar(32) PRIMARY KEY,
        titulo varchar(255) NOT NULL,
        descripcion text NOT NULL,
        fecha varchar(64) NOT NULL,
        tipo varchar(16) NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query('CREATE INDEX idx_contracts_employee_id ON contracts(employee_id)');
    await queryRunner.query('CREATE INDEX idx_attendances_employee_id ON attendances(employee_id)');
    await queryRunner.query('CREATE INDEX idx_attendances_fecha ON attendances(fecha)');
    await queryRunner.query('CREATE INDEX idx_terminations_employee_id ON terminations(employee_id)');
    await queryRunner.query('CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS idx_notifications_created_at');
    await queryRunner.query('DROP INDEX IF EXISTS idx_terminations_employee_id');
    await queryRunner.query('DROP INDEX IF EXISTS idx_attendances_fecha');
    await queryRunner.query('DROP INDEX IF EXISTS idx_attendances_employee_id');
    await queryRunner.query('DROP INDEX IF EXISTS idx_contracts_employee_id');
    await queryRunner.query('DROP TABLE IF EXISTS notifications');
    await queryRunner.query('DROP TABLE IF EXISTS terminations');
    await queryRunner.query('DROP TABLE IF EXISTS attendances');
    await queryRunner.query('DROP TABLE IF EXISTS contracts');
    await queryRunner.query('DROP TABLE IF EXISTS employee_emergency_contacts');
    await queryRunner.query('DROP TABLE IF EXISTS employee_payroll_profiles');
    await queryRunner.query('DROP TABLE IF EXISTS employees');
    await queryRunner.query('DROP TABLE IF EXISTS users');
  }
}

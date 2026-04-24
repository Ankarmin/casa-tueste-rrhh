# Casa Tueste RRHH

Aplicacion de escritorio Electron + React para la gestion de Recursos Humanos de Casa Tueste.

## Requisitos

- Node.js 20+
- Docker Desktop
- PostgreSQL 16 via `docker compose` o una instancia propia

## Configuracion local

1. Instala dependencias con `npm install`.
2. Crea `.env` a partir de `.env.example`.
3. Levanta la base con `npm run db:up`.
4. Ejecuta migraciones y seed con `npm run db:setup`.
5. Inicia la app con `npm start`.

## Scripts utiles

- `npm run lint`
- `npm run typecheck`
- `npm run package`
- `npm run make`
- `npm run release:check`

## Checklist De Release

1. Actualizar `version` en `package.json`.
2. Validar variables de entorno y acceso real a PostgreSQL.
3. Ejecutar `npm run release:check`.
4. Probar inicio de sesion, dashboard, altas, bajas, contratos, asistencias y detalle de empleados.
5. Generar instalador final con `npm run make`.
6. Firmar binarios e instalador segun el flujo de la empresa.
7. Verificar instalacion limpia en una maquina Windows sin entorno de desarrollo.

## Notas Operativas

- La app no usa datos mock en runtime; depende de PostgreSQL e IPC local.
- En entorno empaquetado, la configuracion de BD debe existir en variables de entorno del sistema o en un `.env` accesible para la app.
- `npm audit` todavia reporta vulnerabilidades heredadas por dependencias de Electron Forge/Vite y TypeORM que no tienen correccion segura sin upgrades mayores.

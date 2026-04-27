# Casa Tueste RRHH

Aplicacion de escritorio Electron + React para la gestion de Recursos Humanos de Casa Tueste.

## Requisitos

- Node.js 20+
- Acceso a una base PostgreSQL activa

## Configuracion

1. Instala dependencias con `npm install`.
2. Crea `.env` a partir de `.env.example`.
3. Configura la conexion a Railway en `.env` usando `DATABASE_PUBLIC_URL`.
4. Ejecuta migraciones y seed con `npm run db:setup`.
5. Inicia la app con `npm start`.

## Railway

- Para esta app de escritorio, usa `DATABASE_PUBLIC_URL` porque la conexion sale desde la maquina del usuario.
- `DATABASE_URL` con dominio privado solo sirve para servicios que corren dentro de Railway.
- Si conectas por `DATABASE_PUBLIC_URL`, la app activa SSL automaticamente. Puedes forzarlo manualmente con `DB_SSL=true`.

## Credenciales Seed

- Usuario: `modulo.rrhh@casatueste.pe`
- Contrasena: `rrhh`

## Scripts utiles

- `npm run lint`
- `npm run typecheck`
- `npm run package`
- `npm run make`
- `npm run release:check`

## Build y Distribucion

- `npm run package` genera la app empaquetada en `out/Casa Tueste RRHH-win32-x64/`.
- `npm run make` genera el instalador en `out/make/squirrel.windows/x64/CasaTuesteRRHHSetup.exe`.
- Si compartes la version portable, debes compartir la carpeta completa `out/Casa Tueste RRHH-win32-x64/` o un `.zip` con su contenido.

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
- Si existe un `.env` en la raiz del proyecto al ejecutar `npm run package` o `npm run make`, Electron Forge lo incluye en `resources/.env` para que la app empaquetada pueda conectarse a Railway.
- Antes de distribuir un `.exe`, revisa el `.env` usado en el build, porque cualquier credencial incluida ahi viajara dentro del paquete final.
- `npm audit` todavia reporta vulnerabilidades heredadas por dependencias de Electron Forge/Vite y TypeORM que no tienen correccion segura sin upgrades mayores.

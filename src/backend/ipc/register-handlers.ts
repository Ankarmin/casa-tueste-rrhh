import { registerAttendanceHandlers } from './attendance-handlers';
import { registerAuthHandlers } from './auth-handlers';
import { registerContractHandlers } from './contract-handlers';
import { registerDashboardHandlers } from './dashboard-handlers';
import { registerEmployeeHandlers } from './employee-handlers';
import { registerNotificationHandlers } from './notification-handlers';
import { registerTerminationHandlers } from './termination-handlers';

export function registerBackendHandlers() {
  registerAuthHandlers();
  registerDashboardHandlers();
  registerNotificationHandlers();
  registerEmployeeHandlers();
  registerContractHandlers();
  registerAttendanceHandlers();
  registerTerminationHandlers();
}

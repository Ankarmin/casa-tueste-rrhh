import type { LucideIcon } from 'lucide-react';
import { Clock, FileText, LayoutDashboard, UserMinus, UserPlus, Users } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Panel general', icon: LayoutDashboard },
  { href: '/asistencias', label: 'Asistencias', icon: Clock },
  { href: '/contratos', label: 'Contratos', icon: FileText },
  { href: '/altas', label: 'Altas', icon: UserPlus },
  { href: '/bajas', label: 'Bajas', icon: UserMinus },
  { href: '/empleados', label: 'Empleados', icon: Users },
];

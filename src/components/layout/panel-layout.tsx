import type { ReactNode } from 'react';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { BrandMark } from '../brand-mark';
import { navItems } from '../panel/nav-items';
import { cn } from '../../lib/utils';

const navLinkClasses = 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth';

type PanelLayoutProps = {
  children: ReactNode;
  onLogout: () => void | Promise<void>;
};

export function PanelLayout({ children, onLogout }: PanelLayoutProps) {
  return (
    <div className="h-screen w-full overflow-hidden bg-background lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col overflow-y-auto border-r border-white/10 bg-[#3C2415] text-[#F5EFE9] lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <BrandMark labelClassName="text-white" />
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/50">Gestion</p>
          {navItems.map(({ href, label, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                cn(
                  navLinkClasses,
                  isActive ? 'bg-[#8B5E3C] text-white shadow-glow' : 'text-white/80 hover:bg-white/10 hover:text-white',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-smooth hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesion
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-border bg-background lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-4">
            <BrandMark className="gap-3" />
            <button type="button" onClick={onLogout} className="text-sm font-medium text-primary hover:text-primary-glow">
              Salir
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4">
            {navItems.map(({ href, label, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-smooth',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground shadow-glow'
                      : 'border-border bg-card text-foreground hover:bg-secondary',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

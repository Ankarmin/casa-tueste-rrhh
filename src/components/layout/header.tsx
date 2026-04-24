import { useEffect, useState } from 'react';
import { Bell, BriefcaseBusiness, CalendarClock, Search, UserCog, UserMinus2 } from 'lucide-react';
import { Input } from '../ui/input';
import type { NotificationItem, SessionUser } from '../../shared/dto';
import { unwrapResult } from '../../lib/electron-api';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

const iconsByType = {
  contrato: BriefcaseBusiness,
  asistencia: CalendarClock,
  empleado: UserCog,
  baja: UserMinus2,
};

export function Header({ title, subtitle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [notificaciones, setNotificaciones] = useState<NotificationItem[]>([]);

  useEffect(() => {
    let isMounted = true;

    void Promise.all([
      unwrapResult(window.electronAPI.auth.getSession()),
      unwrapResult(window.electronAPI.notifications.list()),
    ])
      .then(([session, notifications]) => {
        if (!isMounted) {
          return;
        }

        setCurrentUser(session);
        setNotificaciones(notifications);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setCurrentUser(null);
        setNotificaciones([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const unreadCount = notificaciones.length;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/70 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold text-foreground md:text-[26px]">{title}</h1>
          {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:flex">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar empleado, contrato..." className="w-72 bg-background pl-9" />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications((current) => !current)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-smooth hover:bg-secondary"
              aria-expanded={showNotifications}
              aria-label="Ver notificaciones"
            >
              <Bell className="h-4 w-4 text-foreground" />
              <span className="absolute top-1.5 right-1.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {unreadCount}
              </span>
            </button>

            {showNotifications ? (
              <div className="absolute right-0 z-40 mt-3 w-[360px] overflow-hidden rounded-2xl border border-border bg-card shadow-elegant-lg">
                <div className="border-b border-border px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground">Notificaciones</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Seguimiento operativo del modulo de RRHH
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                      {unreadCount} nuevas
                    </span>
                  </div>
                </div>
                <div className="max-h-[420px] overflow-y-auto p-3">
                  <div className="space-y-2">
                    {notificaciones.map((notificacion) => {
                      const Icon = iconsByType[notificacion.tipo];

                      return (
                        <div
                          key={notificacion.id}
                          className="rounded-xl border border-border/60 bg-background px-4 py-3 transition-smooth hover:bg-muted/40"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-foreground">{notificacion.titulo}</p>
                                <span className="shrink-0 text-[11px] text-muted-foreground">{notificacion.fecha}</span>
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{notificacion.descripcion}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3 border-l border-border pl-3">
            <div className="hidden text-right sm:block">
               <p className="text-sm font-semibold leading-tight text-foreground">{currentUser?.nombre ?? 'Sesion local'}</p>
               <p className="text-xs text-muted-foreground">{currentUser?.rol ?? 'Sin sesion activa'}</p>
             </div>
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
               {currentUser?.iniciales ?? 'RR'}
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}

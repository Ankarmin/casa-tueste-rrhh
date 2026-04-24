import type { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';

type KpiCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  trend?: string;
  accent?: 'primary' | 'accent' | 'success' | 'warning';
};

const accentMap = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/15 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/20 text-warning-foreground',
};

export function KpiCard({ title, value, icon: Icon, hint, trend, accent = 'primary' }: KpiCardProps) {
  return (
    <Card className="border-border/60 p-6 shadow-elegant transition-smooth hover:-translate-y-0.5 hover:shadow-elegant-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend ? <p className="mt-4 text-xs font-medium text-success">{trend}</p> : null}
    </Card>
  );
}

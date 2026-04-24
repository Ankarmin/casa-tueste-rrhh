import { cn } from '../../lib/utils';

type StatusVariant = 'vigente' | 'por_vencer' | 'vencido' | 'presente' | 'tarde' | 'ausente' | 'permiso' | 'activo' | 'baja';

const styles: Record<StatusVariant, { label: string; className: string }> = {
  vigente: { label: 'Vigente', className: 'border-success/20 bg-success/10 text-success' },
  por_vencer: {
    label: 'Proximo a vencer',
    className: 'border-warning/30 bg-warning/15 text-warning-foreground',
  },
  vencido: { label: 'Vencido', className: 'border-destructive/20 bg-destructive/10 text-destructive' },
  presente: { label: 'Presente', className: 'border-success/20 bg-success/10 text-success' },
  tarde: { label: 'Tarde', className: 'border-warning/30 bg-warning/15 text-warning-foreground' },
  ausente: { label: 'Ausente', className: 'border-destructive/20 bg-destructive/10 text-destructive' },
  permiso: { label: 'Permiso', className: 'border-accent/30 bg-accent/15 text-accent' },
  activo: { label: 'Activo', className: 'border-success/20 bg-success/10 text-success' },
  baja: { label: 'Baja', className: 'border-border bg-muted text-muted-foreground' },
};

export function StatusBadge({ status, className }: { status: StatusVariant; className?: string }) {
  const variant = styles[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variant.className,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {variant.label}
    </span>
  );
}

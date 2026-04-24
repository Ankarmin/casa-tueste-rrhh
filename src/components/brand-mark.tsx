import { cn } from '../lib/utils';

type BrandMarkProps = {
  className?: string;
  badgeClassName?: string;
  labelClassName?: string;
};

export function BrandMark({ className, badgeClassName, labelClassName }: BrandMarkProps) {
  const imagotipoSrc = `${import.meta.env.BASE_URL}imagotipo.webp`;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2 shadow-sm',
          badgeClassName,
        )}
      >
        <img src={imagotipoSrc} alt="Casa Tueste" className="h-full w-full object-contain" />
      </div>
      <div className={labelClassName}>
        <p className="text-base font-semibold leading-tight">Casa Tueste</p>
        <p className="text-[11px] uppercase tracking-wider opacity-70">Recursos Humanos</p>
      </div>
    </div>
  );
}

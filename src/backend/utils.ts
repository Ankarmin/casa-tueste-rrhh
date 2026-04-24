export function makeInitials(...parts: string[]) {
  return parts
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.trim().charAt(0).toUpperCase())
    .join('');
}

export function fullName(nombres: string, apellidoPaterno: string, apellidoMaterno: string) {
  return [nombres, apellidoPaterno, apellidoMaterno].filter(Boolean).join(' ').trim();
}

export function computeContractStatus(endDate: string): 'vigente' | 'por_vencer' | 'vencido' {
  const today = new Date();
  const end = new Date(endDate);
  const diffInDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    return 'vencido';
  }

  if (diffInDays <= 90) {
    return 'por_vencer';
  }

  return 'vigente';
}

export function parseEmployeeName(nombre: string) {
  const parts = nombre.trim().split(/\s+/);
  const nombres = parts.shift() ?? '';
  const apellidoPaterno = parts.shift() ?? '';
  const apellidoMaterno = parts.join(' ') || 'Sin apellido';
  return { nombres, apellidoPaterno, apellidoMaterno };
}

export function codeNumber(code: string) {
  return Number(code.split('-')[1] ?? 0);
}

export function padCode(prefix: string, value: number) {
  return `${prefix}-${String(value).padStart(3, '0')}`;
}

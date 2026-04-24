import type { Result } from '../../shared/dto';

export async function toResult<T>(operation: () => Promise<T>): Promise<Result<T>> {
  try {
    return { success: true, data: await operation() };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ocurrio un error inesperado.',
    };
  }
}

import type { Result } from '../shared/dto';

export async function unwrapResult<T>(promise: Promise<Result<T>>) {
  const result = await promise;

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
}

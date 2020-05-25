export async function sleep<R>(ms: number, result?: R): Promise<R> {
  return new Promise(resolve => setTimeout(resolve, ms, result));
}

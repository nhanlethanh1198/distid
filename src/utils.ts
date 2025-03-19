const BASE62_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

if (typeof BigInt === 'undefined') {
  throw new Error(
    'BigInt is not supported in this environment. Please use a modern JavaScript runtime.'
  );
}

export function toBase62(num: bigint): string {
  let result = '';
  let n = num;
  while (n > 0n) {
    result = BASE62_CHARS[Number(n % BigInt(62))] + result;
    n = n / BigInt(62);
  }
  return result || '0';
}

export function validateNodeId(nodeId: number, usedIds: Set<number>): void {
  if (nodeId < 0 || nodeId > 1023) {
    throw new Error('Node ID must be between 0 and 1023');
  }
  if (usedIds.has(nodeId)) {
    throw new Error(`Node ID ${nodeId} is already in use`);
  }
}

export interface DistIdConfig {
  nodeId: number; // ID of the node (0-1023)
  epoch?: number; // Epoch timestamp (default: 2020-01-01)
  counterBits?: number; // Counter bits (8-20, default: 12)
  logger?: (msg: string) => void; // Custom logging function
}

export type DistIdFormat = 'number' | 'hex' | 'base36' | 'base62';

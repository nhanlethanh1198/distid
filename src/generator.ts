import { DistIdConfig, DistIdFormat } from './types';
import { toBase62, validateNodeId } from './utils';
import { defaultLogger } from './logger';

export class DistIdGenerator {
  private nodeId: number;
  private epoch: number;
  private counterBits: number;
  private counter: number = 0;
  private lastTimestamp: number = 0;
  private logger: (msg: string) => void;
  private static usedNodeIds = new Set<number>();

  constructor(config: DistIdConfig) {
    validateNodeId(config.nodeId, DistIdGenerator.usedNodeIds);
    this.nodeId = config.nodeId & 0x3ff; // 10 bit
    DistIdGenerator.usedNodeIds.add(this.nodeId);

    this.epoch = config.epoch || new Date('2020-01-01').getTime();
    this.counterBits = config.counterBits || 12;
    if (this.counterBits < 8 || this.counterBits > 20) {
      throw new Error('Counter bits must be between 8 and 20');
    }

    this.logger = config.logger || defaultLogger;
    this.logger(`Initialized DistIdGenerator with nodeId: ${this.nodeId}`);
  }

  private getTimestamp(): number {
    return Date.now() - this.epoch;
  }

  private incrementCounter(timestamp: number): number {
    if (timestamp !== this.lastTimestamp) {
      this.counter = 0;
      this.lastTimestamp = timestamp;
    }
    const maxCounter = (1 << this.counterBits) - 1;
    if (this.counter > maxCounter) {
      this.logger('Counter overflow, waiting for next millisecond');
      while (this.getTimestamp() === this.lastTimestamp) {
        // Busy wait (có thể cải tiến bằng Promise nếu cần)
      }
      return this.incrementCounter(this.getTimestamp());
    }
    return this.counter++;
  }

  /**
   * Generates a distributed ID for large-scale systems.
   * @param format - The output format of the ID ('number', 'hex', 'base36', 'base62').
   * @returns A unique ID in the specified format.
   * @example
   * const gen = new DistIdGenerator({ nodeId: 5 });
   * console.log(gen.generate('hex')); // e.g., "13a8f5c00050007b"
   */
  public generate(format: DistIdFormat = 'number'): string | bigint {
    const timestamp = this.getTimestamp();
    const counter = this.incrementCounter(timestamp);
    const id =
      (BigInt(timestamp) << BigInt(23)) |
      (BigInt(this.nodeId) << BigInt(this.counterBits)) |
      BigInt(counter);

    this.logger(`Generated ID: ${id} (format: ${format})`);

    switch (format) {
      case 'hex':
        return id.toString(16).padStart(16, '0');
      case 'base36':
        return id.toString(36);
      case 'base62':
        return toBase62(id);
      case 'number':
      default:
        return id;
    }
  }

  public static resetNodeIds(): void {
    DistIdGenerator.usedNodeIds.clear();
  }
}

export interface DistIdConfig {
  nodeId: number; // ID của node (0-1023)
  epoch?: number; // Thời điểm bắt đầu (mặc định: 2020-01-01)
  counterBits?: number; // Số bit cho counter (8-20, mặc định: 12)
  logger?: (msg: string) => void; // Hàm logging tùy chọn
}

export type DistIdFormat = 'number' | 'hex' | 'base36' | 'base62';

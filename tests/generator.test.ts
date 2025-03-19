import { DistIdGenerator } from '../src';

describe('DistIdGenerator', () => {
  afterEach(() => {
    DistIdGenerator.resetNodeIds();
  });

  it('should generate unique IDs', () => {
    const gen = new DistIdGenerator({ nodeId: 1 });
    const id1 = gen.generate('hex');
    const id2 = gen.generate('hex');
    expect(id1).not.toBe(id2);
  });

  it('should throw error for duplicate nodeId', () => {
    new DistIdGenerator({ nodeId: 2 });
    expect(() => new DistIdGenerator({ nodeId: 2 })).toThrow(
      'Node ID 2 is already in use'
    );
  });

  it('should support different formats', () => {
    const gen = new DistIdGenerator({ nodeId: 3 });
    expect(typeof gen.generate('number')).toBe('bigint');
    expect(gen.generate('hex')).toMatch(/^[0-9a-f]{16}$/);
    expect(gen.generate('base36')).toMatch(/^[0-9a-z]+$/);
    expect(gen.generate('base62')).toMatch(/^[0-9A-Za-z]+$/);
  });
});

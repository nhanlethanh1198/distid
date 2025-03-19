# DistId

![npm](https://img.shields.io/npm/v/distid) ![license](https://github.com/nhanlethanh1198/distid/LICENSE.md) ![downloads](https://img.shields.io/npm/dt/distid)

A lightweight, distributed ID generator designed for large-scale systems. DistId generates unique 64-bit IDs with built-in timestamp, node identifier, and counter, making it ideal for distributed environments where collision resistance and indexing performance are critical.

## Why DistId?

- **Efficient Indexing**: IDs are time-ordered, reducing fragmentation in database indexes (e.g., B-tree).
- **Scalable**: Supports up to 1024 nodes, generating millions of IDs per second.
- **Compact**: 64-bit IDs (8 bytes), smaller than UUID (16 bytes) or CUID (25+ bytes).
- **Flexible Formats**: Output as `number`, `hex`, `base36`, or `base62`.
- **TypeScript Support**: Fully typed with TypeScript for a better developer experience.

## Features

- Generates 64-bit IDs with timestamp (41 bits), nodeId (10 bits), and counter (12 bits, configurable).
- Collision-resistant across distributed nodes.
- Supports multiple output formats: `number`, `hex`, `base36`, `base62`.
- Customizable epoch, counter bits, and logging.
- Lightweight with zero dependencies.

## Installation

Install DistId via npm:

```bash
npm install distid
```

## Usage

Here's a quick example to get started:

```ts
import { DistIdGenerator } from 'distid';

// Initialize with a nodeId (0-1023)
const gen = new DistIdGenerator({ nodeId: 5 });

// Generate IDs in different formats
console.log(gen.generate('hex'));    // e.g., "13a8f5c00050007b"
console.log(gen.generate('base62')); // e.g., "1Qz5X0K"
console.log(gen.generate('number')); // e.g., 1412894000743680005n
```

## Configuration

You can customize the generator with the following options:

|Option         |Description                             |Default       |
|:--------------|:---------------------------------------|:-------------|
|`nodeId`       |Node identifier (0-1023).               |Required      |
|`epoch`        |Custom epoch timestamp (in ms).         |2020-01-01    |
|`counterBits`  |Number of bits for the counter (8-20).  |12            |
|`logger`       |Custom logging function for debugging.  |Console logger|

Example with custom configuration:

```ts
const gen = new DistIdGenerator({
  nodeId: 5,
  epoch: new Date('2023-01-01').getTime(),
  counterBits: 10,
  logger: (msg) => console.log(`[Custom] ${msg}`),
});

console.log(gen.generate('base36')); // e.g., "1h3k5l0k5"
```

## API Reference

`DistIdGenerator`

#### Constructor

```ts
new DistIdGenerator(config: DistIdConfig)
```

* `config`: Configuration object (see above).

`generate(format?: DistIdFormat): string | bigint`

Generates a unique ID in the specified format.

* `format`: Output format (`'number'`, `'hex'`, `'base36'`, `'base62'`). Default: `'number'`.
* Returns: A unique ID as a `bigint` (for `'number'`) or `string` (for other formats).

`DistIdGenerator.resetNodeIds(): void`
Resets the internal node ID tracking (useful for testing).

## Performance

DistId is designed for high performance in distributed systems. Here's a quick benchmark compared to UUID and CUID (run on Node.js v18):

|Generator|Size (bytes)|IDs/sec (millions)|Index Fragmentation|
|:--------|:-----------|:-----------------|:------------------|
|DistId   |8           |4.2               |Low (time-ordered) |
|UUID v4  |16          |3.8               |High (random)      |
|CUID     |25          |3.5               |Medium             |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/nhanlethanh1198/distid).

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

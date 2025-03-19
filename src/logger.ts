export const defaultLogger = (msg: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[DistId] ${timestamp} - ${msg}`);
};

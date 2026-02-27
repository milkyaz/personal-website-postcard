export function daysBetween(fromISO: string, to = new Date()): number {
  const from = new Date(fromISO);
  // нормализуем до полуночи, чтобы не плавало из-за часов/таймзоны
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());

  const ms = end.getTime() - start.getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

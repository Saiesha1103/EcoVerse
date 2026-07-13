export function hashString(value: string): number {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function pickSpeciesVariant(
  id: string,
  visualSeed: number,
  optionCount: number,
): number {
  if (optionCount <= 0) {
    return 0;
  }

  const combined = hashString(`${id}:${visualSeed}`);

  return combined % optionCount;
}

export function pickCellVariant(
  x: number,
  y: number,
  visualSeed: number,
  optionCount: number,
): number {
  if (optionCount <= 0) {
    return 0;
  }

  const combined = hashString(`${x}:${y}:${visualSeed}`);

  return combined % optionCount;
}

export function cellChance(
  x: number,
  y: number,
  visualSeed: number,
  salt: number,
  probability: number,
): boolean {
  if (probability <= 0) {
    return false;
  }

  if (probability >= 1) {
    return true;
  }

  const combined = hashString(`${x}:${y}:${visualSeed}:${salt}`);
  const normalized = (combined % 1000000) / 1000000;

  return normalized < probability;
}
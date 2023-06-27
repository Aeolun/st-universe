export function pickRandom<T>(from: T[]) {
  return from[Math.floor(Math.random() * from.length)];
}

export function numberBetween(from: number, to: number) {
  return from + Math.round((to - from) * Math.random());
}

export function percentageChance(percentage: number) {
  return Math.random() < percentage / 100;
}

export const uniqueId = (str: string = Math.random().toString(), seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
};

export function randomWeightedKey<T extends string | number | symbol>(
  weights: Record<T, number>
): T {
  const totalWeight = Object.values(weights).reduce(
    (a: number, b: number) => a + b,
    0
  ) as number;
  let random = Math.random() * totalWeight;
  for (const key in weights) {
    const weight = weights[key];
    if (random < weight) {
      return typeof key === "string" ? key : key;
    }
    random -= weight;
  }
  throw new Error("Somehow no result from randomWeightedKey");
}

export function shuffle(original: any[]) {
  const array = [...original];

  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

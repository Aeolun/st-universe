export function pickRandom(from: string[]) {
    return from[Math.floor(Math.random() * from.length)]
}
import { promises as fs } from 'fs';

export interface IMemory {
    memTotal: number;
    memFree: number;
    cached: number;
    swapTotal: number;
    swapFree: number;
}

export const getMemory = async () => {
    const memoryFile = await fs.readFile('/proc/meminfo', 'utf8')
    const matchs = memoryFile.matchAll(/^MemTotal: +(\d+)|^MemFree: +(\d+)|^Cached: +(\d+)|^SwapTotal: +(\d+)|^SwapFree: +(\d+)/gm)

    const memory: IMemory = { } as any

    for (const match of matchs) {
        const [, memTotal, memFree, cached, swapTotal, swapFree] = match

        memory.memTotal = memTotal ? +memTotal : memory.memTotal
        memory.memFree = memFree ? +memFree : memory.memFree
        memory.cached = cached ? +cached : memory.cached
        memory.swapTotal = swapTotal ? +swapTotal : memory.swapTotal
        memory.swapFree = swapFree ? +swapFree : memory.swapFree
    }

    return memory
}
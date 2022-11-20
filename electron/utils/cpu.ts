import { promises as fs } from 'fs';

export interface Core {
    id: number;
    model: string;
    mhz: number;
    cache: string;
}

export const getCpuInfo = async () => {
    const cpuInfo = await fs.readFile('/proc/cpuinfo', 'utf8')
    const matchs = cpuInfo.matchAll(/processor.+: (\d)|model name.+: (.+)|cpu MHz.+: (.+)|cache size.+: (.+)/g)

    const processors: Core[] = []

    const core = { id: undefined, model: undefined, mhz: undefined, cache: undefined } as any

    for (const match of matchs) {
        const [_, id, model, mhz, cache] = match

        core.id = id ? +id : core.id
        core.model = model ? model : core.model
        core.mhz = mhz ? +mhz : core.mhz
        core.cache = cache ? cache : core.cache

        if (core.id && core.model && core.mhz && core.cache) {
            processors.push({ ...core })
            core.id = undefined
            core.model = undefined
            core.mhz = undefined
            core.cache = undefined
        }
    }

    return processors
}
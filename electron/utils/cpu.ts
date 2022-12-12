import { promises as fs } from 'fs';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
export interface ICore {
    id: number;
    model: string;
    mhz: number;
    cache: string;
}

export const getCpuInfo = async () => {
    const cpuInfo = await fs.readFile('/proc/cpuinfo', 'utf8')
    const matchs = cpuInfo.matchAll(/processor.+: (\d)|model name.+: (.+)|cpu MHz.+: (.+)|cache size.+: (.+)/g)

    const processors: ICore[] = []

    const core = {} as any

    for (const match of matchs) {
        const [, id, model, mhz, cache] = match

        core.id = id ? +id : core.id
        core.model = model || core.model
        core.mhz = mhz ? +mhz : core.mhz
        core.cache = cache || core.cache

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


export interface MpStat {
    sysstat: {
        hosts: {
            nodename: string;
            sysname: string;
            release: string;
            machine: string;
            "number-of-cpus": number;
            date: string;
            statistics: {
                timestamp: string;
                "cpu-load": ICPULoad[];
            }[];
        }[];
    };
}
export interface ICPULoad {
    cpu: string;
    usr: number;
    nice: number;
    sys: number;
    iowait: number;
    irq: number;
    soft: number;
    steal: number;
    guest: number;
    gnice: number;
    idle: number;
}

export const getCpuSummary = async () => {
    const output = await exec('mpstat -P ALL -o JSON', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in memory', output.stderr)
    }

    const { sysstat } = JSON.parse(output.stdout) as MpStat
    sysstat.hosts[0].statistics = undefined as any

    return sysstat.hosts[0]
}


export const getCpuUsage = async () => {
    const output = await exec('mpstat -P ALL -o JSON', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in memory', output.stderr)
    }

    const { sysstat } = JSON.parse(output.stdout) as MpStat

    return sysstat.hosts[0].statistics[0]['cpu-load']
}
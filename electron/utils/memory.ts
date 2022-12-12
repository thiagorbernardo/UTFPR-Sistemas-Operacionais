const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IMemory {
    memTotal: number;
    memFree: number;
    memUsed: number;
    memCache: number;
    swapTotal: number;
    swapFree: number;
    swapUsed: number;
}

export const getMemory = async () => {
    const output = await exec('top -bn 1 | grep "MB"', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in memory', output.stderr)
    }

    const matchs = output.stdout.matchAll(/\d+,\d+/gm)

    const values = []
    
    for (const match of matchs) {
        const [value,] = match
        values.push(+value.replace(',', '.'))
    }
    
    const [memTotal, memFree, memUsed, memCache, swapTotal, swapFree, swapUsed] = values
    const memory: IMemory = { memTotal, memFree, memUsed, memCache, swapTotal, swapFree, swapUsed }
    
    return memory
}
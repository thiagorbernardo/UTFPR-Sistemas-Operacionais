const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IDisk {
    total: number;
    free: number;
    used: number;
    percentage: number
}

export const getDiskUsage = async () => {
    const output = await exec('df -h', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in disk', output.stderr)
    }

    const match = output.stdout.match(/ +(.+)\/$/gm)

    const res = match[0]
        .trim()
        .split(' ')
        .filter((v: string) => v.length)
        .map(
            (v: string) => +v.replace(/G|M|%/, '')
        )

    return {
        total: res[0],
        used: res[1],
        free: res[2],
        percentage: res[3]
    }
}
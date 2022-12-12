const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IProcess {
    user: string;
    pid: number;
    ppid: number;
    pri: number;
    pcpu: number;
    pmem: number;
    status: number;
    time: string;
    command: string;
}

export const getProcesses = async () => {
    const output = await exec('ps -eo user,pid,ppid,pri,pcpu,pmem,stat,time,comm:20', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in process', output.stderr)
    }

    const matchs = output.stdout.matchAll(/^(.+) +(\d+) +(\d+) +(\d)+ +(\d+\.\d+) +(\d+\.\d+) +(.+) +(\d{2}:\d{2}:\d{2}) (.+)$/gm)

    const process: IProcess[] = []

    for (const match of matchs) {
        const [, user, pid, ppid, pri, pcpu, pmem, stat, time, comm] = match

        process.push({
            user: user.trim(),
            pid: +pid,
            ppid: +ppid,
            pri: +pri,
            pcpu: +pcpu,
            pmem: +pmem,
            status: stat.trim(),
            time: time.trim(),
            command: comm.trim(),
        })
    }

    return process
}
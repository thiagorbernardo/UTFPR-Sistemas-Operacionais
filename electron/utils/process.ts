const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IProcess {
    uid: string;
    pid: string;
    ppid: string;
    month: string;
    dayOfMonth: number;
    time: string;
    command: string;
}

export const getProcesses = async () => {
    const output = await exec('ps -eLF', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in process', output.stderr)
    }

    const matchs = output.stdout.matchAll(/^(.+) +(\d+) +(\d+) +\d+ +\d+ +\d+ +\d+ +\d+ +\d+ +([A-z]+)(\d+) +.+ +(\d{2}:\d{2}:\d{2}) (.+)$/gm)

    const process: IProcess[] = []

    for (const match of matchs) {
        const [, uid, pid, ppid, month, dayOfMonth, time, command] = match

        process.push({
            uid,
            pid: pid,
            ppid: ppid,
            month,
            dayOfMonth: parseInt(dayOfMonth),
            time,
            command
        })
    }

    return process
}
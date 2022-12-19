const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IProcess {
    user: string;
    pid: number;
    ppid: number;
    pri: number;
    pcpu: number;
    pmem: number;
    status: string;
    time: string;
    command: string;
}

export const getStateDescription = (state: string) => {
    let final = ''
    if(state.includes('R')) {
        final += 'Running'
    } else if(state.includes('S')) {
        final += 'Sleeping'
    } else if(state.includes('D')) {
        final += 'Waiting'
    } else if (state.includes('Z')) {
        final += 'Zombie'
    } else if (state.includes('T')) {
        final += 'Stopped'
    } else if (state.includes('W')) {
        final += 'Paging'
    } else if (state.includes('X')) {
        final += 'Dead'
    }

    return final
}

export const getBSDDescription = (state: string) => {
    let final = ''
    if(state.includes('I') || state.includes('l')) {
        final += 'Multi Threaded'
    } else if (state.includes('<')) {
        final += 'High Priority'
    } else if (state.includes('N')) {
        final += 'Low Priority'
    }

    return final
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
            status: stat,
            // status: `${getStateDescription(stat)} ${getBSDDescription(stat)}`,
            time: time.trim(),
            command: comm.trim(),
        })
    }

    return process
}
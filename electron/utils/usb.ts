const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IUsb {
    bus: string;
    device: string;
    id: string;
    desc: string;
}

export const getUsb = async () => {
    const output = await exec('lsusb', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in usb', output.stderr)
    }

    const matchs = output.stdout.matchAll(/Bus (\d+) Device (\d+): ID (.{4}:.{4}) (.+)/gm)

    const usb: IUsb[] = []

    const core = { } as any

    for (const match of matchs) {
        const [, bus, device, id, desc] = match

        core.bus = bus || core.bus
        core.device = device || core.device
        core.id = id|| core.id
        core.desc = desc || core.desc

        if (core.id && core.device && core.desc && core.bus) {
            usb.push({ ...core })
            core.bus = undefined
            core.device = undefined
            core.id = undefined
            core.desc = undefined
        }
    }

    return usb
}
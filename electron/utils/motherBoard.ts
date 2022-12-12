const util = require('util');
const exec = util.promisify(require('child_process').exec);

export interface IMotherBoard {
    manufac: string;
    prodName: string;
}

export const getMotherBoard = async () => {
    const output = await exec('sudo dmidecode --type baseboard', { encoding: 'utf-8' })

    if (output.stderr) {
        console.log('Error in motherBoard', output.stderr)
    }

    const matchs = output.stdout.matchAll(/Manufacturer: (.+)|Product Name: (.+)/gm)

    const motherBoard: IMotherBoard[] = []

    const core = { } as any

    for (const match of matchs) {
        const [, manufac, prodName] = match

        core.manufac = manufac || core.manufac
        core.prodName = prodName || core.prodName


        if (core.manufac && core.prodName) {
            motherBoard.push({ ...core })
            core.manufac = undefined
            core.prodName = undefined
        }
    }

    return motherBoard
}
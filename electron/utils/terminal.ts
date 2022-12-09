const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const executeInTerminal = async (command: string) => {
    try {
        const output = await exec(command, { encoding: 'utf-8' })

        return {
            output: output.stdout,
            error: false
        }
    } catch (error) {
        const err = JSON.parse(JSON.stringify(error))

        // console.log(err.stderr.match(new RegExp(/\n.+/+'|'+`(${command}.+)`, 'gi'))![0])
        return {
            output: err.stderr.match(new RegExp(/\n.+/+'|'+`(${command}.+)`, 'gi'))![0],
            error: true
        }
    }
}
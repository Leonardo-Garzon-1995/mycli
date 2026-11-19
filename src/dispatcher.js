import greet from './commands/greet.js'
import help from './commands/help.js'

export default function dispatch(obj) {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Invalid input:  Expected an object with command, args, and options properties.')
    }

    switch (obj.command) {
        case 'greet':
            return greet(obj)
        case 'help':
            return help()
        default:
            throw new Error(`Unknown command: ${obj.command}`)
    }
}


function validateRepeatOption(options) {
    
    if (!Object.hasOwn(options, 'repeat')) {
        options['repeat'] = 1
    } else {
        const num = Number(options['repeat'])
        if (Number.isNaN(num)) {
            throw new Error('repeat value must be number')
        }
        if (num <= 0) {
            throw new Error('repeat must be a positive integer')
        }
        if (!Number.isSafeInteger(num)) {
            throw new Error('the number is not a safe integer')
        }

        options['repeat'] = num
    }
}

function validateUppercaseOption(options) {
    if (!Object.hasOwn(options, 'uppercase')) {
        options.uppercase = false
    } else {
        if (typeof options.uppercase !== 'boolean') {
            throw new Error('value type of --uppercase must be a boolean')
        }
    }
}

export default function validateArgs(parsedArgs = {}) {
    if (!parsedArgs.command) {
        if (parsedArgs.args.length > 0 || Object.keys(parsedArgs.options).length > 0) {
            throw new Error(`unexpected argument`)
        }
        return parsedArgs
    }

    switch (parsedArgs.command) {
        case 'help':
            if (parsedArgs.args.length > 0 || Object.keys(parsedArgs.options).length > 0) {
                throw new Error(`unexpected argument`)
            }

            return parsedArgs

        case 'greet':
            const validatedArgs = {
                ...parsedArgs,
                options: {...parsedArgs.options}
            }
            if (!parsedArgs.args[0]) {
                throw new Error("Missing name")
            }
            if (parsedArgs.args.length > 1) {
                throw new Error('Too many names')
            }
            
            validateRepeatOption(validatedArgs.options)
            validateUppercaseOption(validatedArgs.options)

            return validatedArgs

        default:
            throw new Error(`Invalid command '${parsedArgs.command}'`)
    }
}
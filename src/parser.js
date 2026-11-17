const booleanFlags = new Set(['--uppercase'])
const optionFlags = new Set(['--repeat'])

export default function parseArgs(argv=[]) {
    if (argv.length === 0) {
        return {
            command: null,
            args: [],
            options: {}
        }
    }

    const command = argv[0]
    const args = []
    const options = {}

    let index = 1 

    while (index < argv.length) {
        const token = argv[index]
        if (token.startsWith('--')) {
            if (!booleanFlags.has(token) && !optionFlags.has(token)) {
                throw new Error(`Unknown option: ${token}`)
            }
            if (booleanFlags.has(token)) {
                options[token.substring(2)] = true
                index++
                continue
            }
            if (optionFlags.has(token)) {
                if (index + 1 >= argv.length || argv[index + 1].startsWith('--')) {
                    throw new Error(`Missing value for option: ${argv[index]}`)
                }

                const optionName = token.substring(2)
                const optionValue = argv[index + 1]
                options[optionName] = optionValue
                index += 2
                continue
            }
        }
        
        args.push(token)
        index++
    }

    return {command, args, options}
}
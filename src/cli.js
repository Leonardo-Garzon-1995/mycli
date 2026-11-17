import parseArgs from "./parser.js";
import validateArgs from "./validator.js";


function main() {
    const [,, ...rest] = process.argv

    try {
        const parsedArguments = parseArgs(rest)
        const validatedArguments = validateArgs(parsedArguments)

        console.log('Parsed arguments:\n')
        console.log(validatedArguments)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exitCode = 1 
    }
}

main()
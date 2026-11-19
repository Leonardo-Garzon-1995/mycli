import parseArgs from "./parser.js";
import validateArgs from "./validator.js";
import dispatch from "./dispatcher.js";


function main() {
    const [,, ...rest] = process.argv

    try {
        const parsedArguments = parseArgs(rest)
        const validatedArguments = validateArgs(parsedArguments)
        const dispatchedOutput = dispatch(validatedArguments)

        console.log(dispatchedOutput)

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exitCode = 1 
    }
}

main()
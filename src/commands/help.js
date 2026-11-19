export default function help() {
    let result = 'mycli - A simple command-line application\n\n'
    result += 'Usage:\n'
    result += '\tmycli <command> [options]\n\n'
    result += 'Commands:\n'
    result += '\tgreet <name>    Print a greeting\n'
    result += '\thelp            Display this help message\n\n'
    result += 'Options for greet:\n'
    result += '\t--repeat <n>    Repeat the greeting n times\n'
    result += '\t--uppercase     Convert the greeting to uppercase'

    return result
}


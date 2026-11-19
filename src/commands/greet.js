export default function greet(obj) {
    const count = obj.options.repeat 
    const name = obj.args[0] 
    const isUpperCase = obj.options.uppercase

    const message = `Hello, ${name}!`

    const result = []

    for (let i = 0; i < count; i++) {
        result.push(message)
    }

    const joinedResult = result.join('\n')
    return isUpperCase === true ? joinedResult.toUpperCase() : joinedResult
}

import { test } from 'node:test'
import assert from 'node:assert/strict'
import validateArgs from '../src/validator.js'
import parseArgs from '../src/parser.js'

test('Parses and validates a greet command', () => {
    const input = ['greet', 'Alice', '--repeat', '3', '--uppercase']

    const expected = {
        command: 'greet',
        args: ['Alice'],
        options: {
            repeat: 3,
            uppercase: true
        }
    }

    const parsedArguments = parseArgs(input)
    const validatedArguments = validateArgs(parsedArguments)

    assert.deepStrictEqual(validatedArguments, expected)
})
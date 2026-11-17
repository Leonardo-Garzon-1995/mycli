import {test, describe } from 'node:test'
import assert from 'node:assert/strict'
import validateArgs from '../src/validator.js'

const invalidRepeatCases = [
    {
        value: '-2',
        expected: /repeat must be a positive integer/
    },
    {
        value: '0',
        expected: /repeat must be a positive integer/
    },
    {
        value: '2.5',
        expected: /the number is not a safe integer/
    },
    {
        value: 'abc',
        expected: /repeat value must be number/
    },
    {
        value: String(Number.MAX_SAFE_INTEGER + 1),
        expected: /the number is not a safe integer/
    }
]

describe('greet command', () => {
    test('Normalizes greet options', () => {
        const input = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: '3'
            }
        }

        const expected = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: 3,
                uppercase: false
            }
        }

        assert.deepStrictEqual(validateArgs(input), expected)
    })

    test('Accepts the maximum safe integer', () => {
        const input = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: String(Number.MAX_SAFE_INTEGER)
            }
        }

        const result = validateArgs(input)

        assert.strictEqual(result.options.repeat, Number.MAX_SAFE_INTEGER)
    })

    for (const {value, expected} of invalidRepeatCases) {
        test(`Rejects repeat value ${value}`, () => {
            const input = {
                command: 'greet',
                args: ['Alice'],
                options: {
                    repeat: value
                }
            }

            assert.throws(
                () => validateArgs(input),
                expected
            )
        })
    }
})

describe('Inmutability', () => {
    test('Does not mutate the original parsed arguments', () => {
        const input = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: '3'
            }
        }

        const expected = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: '3'
            }
        }
        validateArgs(input)

        assert.deepStrictEqual(input, expected)
    })

    test('Validates arguments with frozen options', ()=> {
        const input = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: '3'
            }
        }

        Object.freeze(input.options)
        const expected = {
            command: 'greet',
            args: ['Alice'],
            options: {
                repeat: 3,
                uppercase: false
            }
        }

        const result = validateArgs(input)
        assert.deepStrictEqual(result, expected)
        assert.strictEqual(input.options.repeat, '3')
    })
})





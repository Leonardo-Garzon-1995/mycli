import test from 'node:test'
import assert from 'node:assert/strict'
import parseArgs from '../src/parser.js'

test('parses a basic greet command', () => {
    const input = ['greet', 'Alice']

    const result = parseArgs(input)

    const expected = {
        command: 'greet',
        args: ['Alice'],
        options: {}
    }

    assert.deepStrictEqual(result, expected)
})

test('rejects an unknown option', () => {
    const input = ['greet', 'Alice', '--unknown']

    const expected = /Unknown option: --unknown/

    assert.throws(
        () => parseArgs(input),
        expected
    )
})
import {test } from 'node:test'
import assert from 'node:assert/strict'
import dispatch from '../src/dispatcher.js'

test('Dispatches a valid greet command', () => {
    const input = {
        command: 'greet',
        args: ['Alice'],
        options: {
            repeat: 2,
            uppercase: false
        }
    }

    const expected = 'Hello, Alice!\nHello, Alice!'
    const result = dispatch(input)

    assert.strictEqual(result, expected)
})

test('Rejects an unsoported command', () => {
    const input = {
        command: 'unknown',
        args: [],
        options: {}
    }

    const expected = /Unknown command: unknown/

    assert.throws(
        () => dispatch(input),
        expected
    )
})
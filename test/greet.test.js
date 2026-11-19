import {test} from 'node:test'
import assert from 'node:assert/strict'
import greet from '../src/commands/greet.js'

test('greet function should return the correct greeting message', () => {
    const input = {
        command: 'greet',
        args: ['Alice'],
        options: {
            repeat: 2,
            uppercase: true
        }
    }

    const expectedOutput = 'HELLO, ALICE!\nHELLO, ALICE!'

    const result = greet(input)

    assert.strictEqual(result, expectedOutput)
})
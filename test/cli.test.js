import { spawnSync } from 'node:child_process'
import {test} from 'node:test'
import assert from 'node:assert/strict'

test('CLI exits with status 1 for an invalid command', () => {
    const processResult = spawnSync(
        process.execPath,
        ['src/cli.js', 'invalid'],
        {encoding: 'utf-8'}
    )

    assert.strictEqual(processResult.status, 1)
    assert.match(processResult.stderr, /Invalid command 'invalid'/)
    assert.strictEqual(processResult.stdout, '')    
})

test('CLI exits successfully for a valid greet command', () => {
    const processResult = spawnSync(
        process.execPath,
        [
            'src/cli.js',
            'greet',
            'Alice',
            '--repeat',
            '3',
            '--uppercase'
        ],
        { encoding: 'utf-8'}
    )
  
    assert.strictEqual(processResult.status, 0)
    assert.strictEqual(processResult.stderr, '')
    assert.match(processResult.stdout, /Parsed arguments:/)
    assert.match(processResult.stdout, /Alice/)
})
import prompts from 'prompts'
import options from './options'
import type { executionConfig } from "./types";

export const iterativeAction = async (resourceName: string, config: executionConfig) => {
    const action = await prompts({
        type: 'autocomplete',
        name: 'action',
        message: `Select Action: `,
        choices: [
            ...Object.keys(options[resourceName]).map(a => { return { title: a, value: a } }),
            { title: 'Back', value: 'back' },
            { title: 'Exit', value: 'exit' },
        ],
    })

    if (action.action === undefined) {
        console.error('No action selected')
        process.exit(0)
    }

    if (action.action === 'exit') {
        process.exit(0)
    }

    if (action.action === 'back') {
        await iterativeAll(config)
    }else{
        await options[resourceName][action.action](config)
    }
}

export const iterativeAll = async (config: executionConfig) => {
    const resource = await prompts({
        type: 'autocomplete',
        name: 'resource',
        message: `Select Resource: `,
        choices: Object.keys(options).map(r => { return { title: r, value: r } }),
    })

    if (resource.resource === undefined) {
        console.error('No resource selected')
        process.exit(0)
    }

    await options[resource.resource]["get"](config)
} 
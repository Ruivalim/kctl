import prompts from 'prompts'
import options from './options'
import type { executionConfig } from "./types";

export const iterativeAction = async (resourceName: string, config: executionConfig) => {
    const action = await prompts({
        type: 'select',
        name: 'action',
        message: `Select Action: `,
        choices: Object.keys(options[resourceName]).map(a => { return { title: a, value: a } }),
    })

    if (action.action === undefined) {
        console.log('No action selected')
        process.exit(0)
    }

    await options[resourceName][action.action](config)
}

export const iterativeAll = async (config: executionConfig) => {
    const resource = await prompts({
        type: 'select',
        name: 'resource',
        message: `Select Resource: `,
        choices: Object.keys(options).map(r => { return { title: r, value: r } }),
    })

    if (resource.resource === undefined) {
        console.log('No resource selected')
        process.exit(0)
    }

    await options[resource.resource]["get"](config)
} 
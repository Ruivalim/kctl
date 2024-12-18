import { parseArgs } from "util";
import { $ } from "bun";
import options from './options'
import type { executionConfig } from "./types";
import { help, helpAction } from "./help";
import { iterativeAll } from "./iterative";
import { checkForUpdates, update } from "./update";

const namespace = await $`kubectl config view --minify -o jsonpath='{..namespace}'`.text()

const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        help: { 
            type: 'boolean',
            description: 'Show help',
            short: 'h',
        },
        namespace: {
            type: 'string',
            default: namespace,
            description: 'Namespace to work on (default: current context)',
            short: 'n',
        },
        version: {
            type: 'boolean',
            description: 'Verbose output',
        },
        update: {
            type: 'boolean',
            description: 'Update kctl to the latest version',
        }
    },
    strict: true,
    allowPositionals: true,
});

if (values.update) {
    await update();
    process.exit(0)
}

await checkForUpdates();

if (values.version) {
    console.log(
        `kctl v${require('../package.json').version}\nBuilt on Bun 1.1.24\nMade with <3 by @ruivalim`
    )
    process.exit(0)
}

const configs: executionConfig = {
    namespace: values.namespace ?? namespace,
}

if (positionals.length === 2) {
    if(values.help){
        help(options);
    }

    await iterativeAll(configs)
}else{
    const resourceName = positionals[2]
    const actionName = positionals[3] ?? 'get'

    if(!Object.keys(options).includes(resourceName)){
        console.error('Invalid resource')
        console.error('Valid resources are: ', Object.keys(options))
        process.exit(0)
    }

    if(values.help){
        helpAction(resourceName, options);
    }
    
    if(!Object.keys(options[resourceName]).includes(actionName)){
        console.error('Invalid action')
        console.error('Valid actions are: ', Object.keys(options[resourceName]))
        process.exit(0)
    }

    await options[resourceName][actionName](configs)
}
import type { iOptions } from "./types";

const optionsHelper = `Options:
    -h, --help: Show help
    -n, --namespace: Namespace to work on
    --version: Verbose output`;

export const help = (options: iOptions) => {
    console.log(`Usage: kctl [options] [resource] [action]

${optionsHelper}

Resources:
${Object.keys(options).map(a => `    ${a}`).join('\n')}`);
    
    process.exit(0)
}

export const helpAction = (resource: string, options: iOptions) => {
    console.log(`Usage: kctl [options] ${resource} [action]

${optionsHelper}

Actions:
${Object.keys(options[resource]).map(a => `    ${a}`).join('\n')}`);
    
    process.exit(0)
}
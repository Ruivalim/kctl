import { listPods } from "./helper";
import type { iAction } from "../../types";
import ora from 'ora';
import prompts from "prompts";
import { runAndDetach } from "../../common";

const podEdit: iAction = async (config) => {
    const spinner = ora('Fetching pods').start();
    const pods = await listPods(config.namespace);
    spinner.stop();

    const pod = await prompts({
        type: 'autocomplete',
        name: 'pod',
        message: `Select Pod: `,
        choices: pods.map(p => { return { title: p.name, value: p.name } }),
    })

    if (pod.pod === undefined) {
        console.log('No pod selected')
        process.exit(0)
    }

    const podData = pods.find(p => p.name === pod.pod)

    if (podData === undefined) {
        console.log('Pod not found')
        process.exit(0)
    }
    
    await runAndDetach(`kubectl edit pod -n ${config.namespace} ${pod.pod}`)
}

await podEdit({ namespace: process.env.KCTL_namespace! });
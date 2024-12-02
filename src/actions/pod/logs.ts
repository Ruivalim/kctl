import { listPods } from "./helper";
import prompts from 'prompts'
import type { iAction } from "../../types";
import ora from 'ora';
import { run } from "../../common";

const podLogs: iAction = async (config) => {
    const spinner = ora('Fetching pods').start();
    const pods = await listPods(config.namespace);
    spinner.stop();

    const pod = await prompts({
        type: 'select',
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
    
    if (podData.containers.length === 1) {
        await run(`kubectl logs ${pod.pod} -f`)
    }else{
        const container = await prompts({
            type: 'select',
            name: 'container',
            message: `Select Container: `,
            choices: podData.containers.map(c => { return { title: c, value: c } }),
        })

        if (container.container === undefined) {
            console.log('No container selected')
            process.exit(0)
        }

        await run(`kubectl logs ${pod.pod} -c ${container.container} -f`)
    }
}

await podLogs({ namespace: process.env.KCTL_namespace! });
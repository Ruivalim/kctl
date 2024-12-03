import { listPods } from "./helper";
import type { iAction, iPodList } from "../../types";
import ora from 'ora';
import { $ } from "bun";
import prompts from "prompts";

const podDelete: iAction = async (config) => {
    const spinner = ora('Fetching pods').start();
    const pods = await listPods(config.namespace);
    spinner.stop();

    const pod = await prompts({
        type: 'multiselect',
        name: 'pod',
        message: `Select Pod: `,
        choices: pods.map(p => { return { title: p.name, value: p.name } }),
    })

    if (pod.pod === undefined || pod.pod.length === 0) {
        console.log('No pods selected')
        process.exit(0)
    }

    const podsData: iPodList[] = pod.pod.map((avc: string) => pods.find(p => p.name === avc));

    if (podsData === undefined || podsData.length === 0) {
        console.log('Pods not found')
        process.exit(0)
    }

    spinner.start('Deleting pods');
    for await (const podData of podsData) {
        await $`kubectl delete pod -n ${config.namespace} ${podData.name}`.text();
    };
    spinner.stop();

    process.exit(0);
}

await podDelete({ namespace: process.env.KCTL_namespace! });
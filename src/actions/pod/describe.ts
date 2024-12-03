import { listPods } from "./helper";
import type { iAction } from "../../types";
import ora from 'ora';
import blessed from 'blessed';
import { $ } from "bun";
import prompts from "prompts";

const podDescribe: iAction = async (config) => {
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

    const describe = await $`kubectl describe pod -n ${config.namespace} ${podData.name}`.text();

    const screen = blessed.screen({
        smartCSR: true,
        title: podData.name,
    });

    const box = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: describe,
        tags: true,
        scrollable: true,
        alwaysScroll: true,
        scrollbar: {
            style: { bg: 'yellow' },
        },
        keys: true,
    });

    screen.append(box);

    screen.key(['escape', 'q', 'C-c'], async () => {
        screen.destroy();
        process.stdin.removeAllListeners('data');
        process.stdin.pause();
        process.exit(0);
    });

    screen.render();
}

await podDescribe({ namespace: process.env.KCTL_namespace! });
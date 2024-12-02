import { listPods } from "./helper";
import type { iAction } from "../../types";
import ora from 'ora';
import Table from 'cli-table';
import { iterativeAction } from "../../iterative";

const podGet: iAction = async (config) => {
    const spinner = ora('Fetching pods').start();
    const pods = await listPods(config.namespace);
    spinner.stop();

    const table = new Table({
        head: ['Name', 'Status', 'Containers']
    });

    pods.forEach(pod => {
        table.push([
            pod.name,
            pod.status,
            pod.containers_status.map(c => `${c.name}: ${c.ready ? 'Ready' : 'Not Ready'} - Restarts: ${c.restarts}`).join('\n')
        ])
    });

    console.log(table.toString());

    await iterativeAction('pod', config)
}

export default podGet
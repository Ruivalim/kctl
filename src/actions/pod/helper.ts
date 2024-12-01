import { $ } from "bun";
import type { iPodList } from "../../types";

const listPods: (namespace: string) => Promise<iPodList[]> = async (namespace: string) => {
    const output = await $`kubectl get pod -n ${namespace} -o json`.text();
    const obj = JSON.parse(output);
    const pods = obj.items;
    
    return pods.map((pod: any) => {
        return {
            name: pod.metadata.name,
            namespace: pod.metadata.namespace,
            status: pod.status.phase,
            age: pod.metadata.creationTimestamp,
            containers: pod.spec.containers.map((c: any) => c.name)
        } as iPodList
    })
}

export { listPods }
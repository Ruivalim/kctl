import path from "path";
import type { executionConfig, iOptions } from "./types";
import { spawn } from "bun";
import { iterativeAction } from "./iterative";

const start = async (file: string, config: executionConfig, resource: string) => {
    await spawn(`bun ${path.resolve(__dirname, file)}`.split(" "), { 
        stdio: ["inherit", "inherit", "inherit"],
        env: {
            ...process.env,
            ...Object.fromEntries(Object.entries(config).map(([key, value]) => [`KCTL_${key}`, value]))
        },
        onExit() {
            iterativeAction(resource, config)
        }
    })
};

const options: iOptions = {
    pod: {
        get: async (config) => start("./actions/pod/get.ts", config, "pod"),
        logs: async (config) => start("./actions/pod/logs.ts", config, "pod"),
        describe: async (config) => start("./actions/pod/describe.ts", config, "pod"),
        delete: async (config) => start("./actions/pod/delete.ts", config, "pod"),
        edit: async (config) => start("./actions/pod/edit.ts", config, "pod"),
    },
};

export default options;

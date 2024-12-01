import { spawn } from "bun";

export const run = async (command: string) => {
    console.log(`Running: ${command}`);
    const proc = spawn(command.split(" "));
    
    for await (const chunk of proc.stdout) {
        console.log(new TextDecoder().decode(chunk));
    }
}
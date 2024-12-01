export type executionConfig = {
    namespace: string
}
export type iAction = (config: executionConfig) => Promise<void>

export interface iActions {
    [key: string]: iAction
}

export interface iOptions {
    [key: string]: iActions
}

export interface iPodList {
    name: string,
    namespace: string,
    status: string,
    age: string,
    containers: string[]
}
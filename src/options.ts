import podLogs from './actions/pod/logs'
import type { iOptions } from './types'

const options: iOptions = {
    'pod': {
        'logs': podLogs,
    },
}

export default options
import podGet from './actions/pod/get'
import podLogs from './actions/pod/logs'
import type { iOptions } from './types'

const options: iOptions = {
    'pod': {
        'logs': podLogs,
        'get': podGet
    },
}

export default options
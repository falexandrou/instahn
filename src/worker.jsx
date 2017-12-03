import rootReducer from 'reducers';
import { createWorker } from 'redux-worker'

let worker = createWorker();
worker.registerReducer(rootReducer);

export default worker;
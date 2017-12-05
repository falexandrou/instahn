import rootReducer from 'reducers';
import { createWorker } from 'redux-worker'

// Delegate our redux actions & reducers in the worker so that the app performs faster
let worker = createWorker();
worker.registerReducer(rootReducer);

export default worker;
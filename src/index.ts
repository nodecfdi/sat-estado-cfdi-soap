/** Hello world */
import { SoapClientFactory } from './SoapClientFactory';
import { SoapConsumerClient } from './SoapConsumerClient';

export { SoapClientFactory, SoapConsumerClient };

Object.assign(module.exports, SoapConsumerClient);
Object.assign(module.exports, SoapClientFactory);
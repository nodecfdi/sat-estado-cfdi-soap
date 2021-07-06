import { SoapClientFactory } from '../../src/SoapClientFactory';
import { SoapConsumerClient } from '../../src/SoapConsumerClient';
import { SpySoapConsumerClient } from '../SpySoapConsumerClient';

describe('My Test Suite', () => {
  it('Consumer Client Can Be Created Without Arguments', () => {
    const client = new SoapConsumerClient();
    expect(client.getSoapClientFactory() instanceof SoapClientFactory).toBe(true);
  });

  it('Consumer Client Can Be Created With Soap client Factory', () => {
    const factory = new SoapClientFactory();
    const client = new SoapConsumerClient(factory);
    expect(factory).toBe(client.getSoapClientFactory());
  });

  it('Consume Receiving empty response As Response', async() => {
    const callReturn = {
      CodigoEstatus: '',
      EsCancelable: '',
      Estado: '',
      EstatusCancelacion: '',
      ValidacionEFOS: '',
    };
    const client = new SpySoapConsumerClient(callReturn);
    const response = await client.consume('https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl', 'expression');
    expect(response.get('Estado')).toBe('');
  });

  it('Consume Receiving object response', async() => {
    const callReturn = {
      CodigoEstatus: '',
      EsCancelable: '',
      Estado: 'X - dummy!',
      EstatusCancelacion: '',
      ValidacionEFOS: '',
    };
    const client = new SpySoapConsumerClient(callReturn);
    const response = await client.consume('https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl', 'expression');
    expect(response.get('Estado')).toBe('X - dummy!');
  });
});

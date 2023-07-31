import { type ConsumerClientResponseInterface } from '@nodecfdi/sat-estado-cfdi';
import { SpySoapConsumerClient } from '../spy-soap-consumer-client';
import { SoapClientFactory } from 'src/soap-client-factory';
import { SoapConsumerClient } from 'src/soap-consumer-client';

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

    it('Consume Receiving empty response As Response', async () => {
        const callReturn = {
            CodigoEstatus: '',
            EsCancelable: '',
            Estado: '',
            EstatusCancelacion: '',
            ValidacionEFOS: '',
        };
        const client = new SpySoapConsumerClient(Promise.resolve(callReturn));
        const response = await client.consume<ConsumerClientResponseInterface>(
            'https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl',
            'expression',
        );
        expect(response.get('Estado')).toBe('');
    });

    it('Consume Receiving object response', async () => {
        const callReturn = {
            CodigoEstatus: '',
            EsCancelable: '',
            Estado: 'X - dummy!',
            EstatusCancelacion: '',
            ValidacionEFOS: '',
        };
        const client = new SpySoapConsumerClient(Promise.resolve(callReturn));
        const response = await client.consume<ConsumerClientResponseInterface>(
            'https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl',
            'expression',
        );
        expect(response.get('Estado')).toBe('X - dummy!');
    });
});

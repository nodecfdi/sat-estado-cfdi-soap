import { ConsumerClientInterface, ConsumerClientResponse } from '@nodecfdi/sat-estado-cfdi';
import { Client } from 'soap';
import { SoapClientFactory } from './soap-client-factory';

interface Response extends Record<string, string | null> {
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
}

export class SoapConsumerClient implements ConsumerClientInterface {
    private soapClientFactory: SoapClientFactory;

    constructor(factory?: SoapClientFactory) {
        this.soapClientFactory = factory || new SoapClientFactory();
    }

    public getSoapClientFactory(): SoapClientFactory {
        return this.soapClientFactory;
    }

    public async consume<ConsumerClientResponseInterface>(
        uri: string,
        expression: string
    ): Promise<ConsumerClientResponseInterface> {
        const soapClient = await this.getSoapClientFactory().create(uri);
        // make call
        const data = await this.callConsulta(soapClient, expression);
        const clientResponse = new ConsumerClientResponse();
        clientResponse.set(data);

        return clientResponse as unknown as Promise<ConsumerClientResponseInterface>;
    }

    protected async callConsulta(client: Client, arg: string): Promise<Response> {
        const response = await client.ConsultaAsync({ expresionImpresa: arg });

        return response[0].ConsultaResult;
    }
}

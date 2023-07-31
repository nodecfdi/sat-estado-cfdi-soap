import { type CNode, type CNodeHasValueInterface, XmlNodeUtils } from '@nodecfdi/cfdiutils-common';
import { type ConsumerClientInterface, ConsumerClientResponse } from '@nodecfdi/sat-estado-cfdi';
import { type AxiosInstance } from 'axios';
import { SoapClientFactory } from './soap-client-factory';

export interface Response extends Record<string, string | null> {
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
}

export class SoapConsumerClient implements ConsumerClientInterface {
    private readonly soapClientFactory: SoapClientFactory;

    constructor(factory?: SoapClientFactory) {
        this.soapClientFactory = factory ?? new SoapClientFactory();
    }

    public getSoapClientFactory(): SoapClientFactory {
        return this.soapClientFactory;
    }

    public async consume<ConsumerClientResponseInterface>(
        uri: string,
        expression: string,
    ): Promise<ConsumerClientResponseInterface> {
        const soapClient = this.getSoapClientFactory().create(uri);
        // make call
        const data = await this.callConsulta(soapClient, expression);
        const clientResponse = new ConsumerClientResponse();
        clientResponse.set(data);

        return clientResponse as unknown as Promise<ConsumerClientResponseInterface>;
    }

    protected async callConsulta(client: AxiosInstance, arg: string): Promise<Response> {
        const response = await client.post(
            'https://consultaqr.facturaelectronica.sat.gob.mx/consultacfdiservice.svc?wsdl',
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                <soapenv:Header/>
                <soapenv:Body>
                   <tem:Consulta>
                      <tem:expresionImpresa> <![CDATA[${arg}]]></tem:expresionImpresa>
                   </tem:Consulta>
                </soapenv:Body>
             </soapenv:Envelope>`,
        );
        const document = XmlNodeUtils.nodeFromXmlString(response.data as string);

        const path = ['s:Body', 'ConsultaResponse', 'ConsultaResult'];

        const statusCode = this.getValue(document.searchNode(...path, 'a:CodigoEstatus') as CNode);

        if (!statusCode) {
            throw new Error('Unexpected Response');
        }

        return {
            CodigoEstatus: statusCode,
            EsCancelable: this.getValue(document.searchNode(...path, 'a:EsCancelable') as CNode),
            Estado: this.getValue(document.searchNode(...path, 'a:Estado') as CNode) as string,
            EstatusCancelacion: this.getValue(document.searchNode(...path, 'a:EstatusCancelacion') as CNode),
            ValidacionEFOS: this.getValue(document.searchNode(...path, 'a:ValidacionEFOS') as CNode),
        };
    }

    private getValue(node?: CNodeHasValueInterface): string | null {
        return node && node.value() !== '' ? node.value() : null;
    }
}

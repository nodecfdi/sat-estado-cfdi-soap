/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConsumerClientInterface,
  ConsumerClientResponse,
  ConsumerClientResponseInterface,
} from '@nodecfdi/sat-estado-cfdi';
import { Client } from 'soap';
import { SoapClientFactory } from './SoapClientFactory';

export class SoapConsumerClient implements ConsumerClientInterface {
  private soapClientFactory: SoapClientFactory;

  constructor(factory?: SoapClientFactory) {
    this.soapClientFactory = factory || new SoapClientFactory();
  }

  public getSoapClientFactory(): SoapClientFactory {
    return this.soapClientFactory;
  }

  public async consume(uri: string, expression: string): Promise<ConsumerClientResponseInterface> {
    const soapClient = await this.getSoapClientFactory().create(uri);
    // make call
    const data = await this.callConsulta(soapClient, expression);
    const clientResponse = new ConsumerClientResponse();
    clientResponse.set(data);
    return clientResponse;
  }

  protected async callConsulta(
    client: Client,
    arg: string,
  ): Promise<{
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
  }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response = await client.ConsultaAsync({ expresionImpresa: arg });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return response[0].ConsultaResult;
  }
}

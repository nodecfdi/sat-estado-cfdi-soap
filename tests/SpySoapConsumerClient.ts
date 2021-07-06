import { SoapConsumerClient } from '../src/SoapConsumerClient';
import { Client } from 'soap';

export class SpySoapConsumerClient extends SoapConsumerClient {
  public lastSoapClient?: Client;

  public lastArguments?: string;

  public lastOptions?: Record<string, unknown>;

  public callConsultaReturn: {
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
  };

  constructor(callConsultaReturn: {
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
  }) {
    super();
    this.callConsultaReturn = callConsultaReturn;
  }

  protected async callConsulta(
    client: Client,
    args: string,
  ): Promise<{
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
  }> {
    this.lastSoapClient = client;
    this.lastArguments = args;
    return new Promise((resolve) => {
      resolve(this.callConsultaReturn);
    });
  }
}

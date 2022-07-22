import { SoapConsumerClient } from '~/soap-consumer-client';
import { Client } from 'soap';

interface Response extends Record<string, string | null> {
    CodigoEstatus: string;
    EsCancelable: null | string;
    Estado: string;
    EstatusCancelacion: null | string;
    ValidacionEFOS: null | string;
}

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

    protected override async callConsulta(client: Client, args: string): Promise<Response> {
        this.lastSoapClient = client;
        this.lastArguments = args;

        return Promise.resolve(this.callConsultaReturn);
    }
}

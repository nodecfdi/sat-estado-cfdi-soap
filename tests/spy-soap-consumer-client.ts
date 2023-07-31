import { type AxiosInstance } from 'axios';
import { type Response, SoapConsumerClient } from 'src/soap-consumer-client';

export class SpySoapConsumerClient extends SoapConsumerClient {
    public lastSoapClient?: AxiosInstance;

    public lastArguments?: string;

    public lastOptions?: Record<string, unknown>;

    public callConsultaReturn: Promise<Response>;

    constructor(callConsultaReturn: Promise<Response>) {
        super();
        this.callConsultaReturn = callConsultaReturn;
    }

    protected override async callConsulta(client: AxiosInstance, args: string): Promise<Response> {
        this.lastSoapClient = client;
        this.lastArguments = args;

        return this.callConsultaReturn;
    }
}

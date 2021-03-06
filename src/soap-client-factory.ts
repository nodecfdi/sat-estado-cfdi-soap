import axios, { AxiosInstance } from 'axios';

export class SoapClientFactory {
    public static DEFAULT_OPTIONS = {
        timeout: 10000, // 10 seconds for timeout
        headers: { 'Content-Type': 'text/xml', 'SoapAction': 'http://tempuri.org/IConsultaCFDIService/Consulta' }
    };

    private customSoapOptions: {
        baseURL?: string;
        timeout?: number;
        headers?: Record<string, string>;
    };

    /**
     *
     */
    constructor(customSoapOptions?: { baseURL?: string; timeout?: number; headers?: Record<string, string> }) {
        this.customSoapOptions = customSoapOptions || {};
    }

    public finalSoapOptions(): Record<string, unknown> {
        return {
            ...SoapClientFactory.DEFAULT_OPTIONS,
            ...this.customSoapOptions
        };
    }

    public create(serviceLocation: string): AxiosInstance {
        return this.createSoapClientWithOptions(serviceLocation, this.finalSoapOptions());
    }

    protected createSoapClientWithOptions(serviceLocation: string, options: Record<string, unknown>): AxiosInstance {
        return axios.create({
            baseURL: serviceLocation,
            ...options
        });
    }

    public getCustomSoapOptions(): Record<string, unknown> {
        return this.customSoapOptions;
    }
}

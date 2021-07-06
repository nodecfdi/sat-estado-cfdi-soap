import { Client, createClientAsync } from 'soap';

export class SoapClientFactory {
  public static DEFAULT_OPTIONS = {
    timeout: 10000, // 10 seconds for timeout
  };

  private customSoapOptions: Record<string, unknown>;

  /**
   *
   */
  constructor(customSoapOptions?: Record<string, unknown>) {
    this.customSoapOptions = customSoapOptions ?? {};
  }

  public finalSoapOptions(): Record<string, unknown> {
    return {
      ...SoapClientFactory.DEFAULT_OPTIONS,
      ...this.customSoapOptions,
    };
  }

  public async create(serviceLocation: string): Promise<Client> {
    const client = await this.createSoapClientWithOptions(serviceLocation, this.finalSoapOptions());
    return client;
  }

  protected async createSoapClientWithOptions(
    serviceLocation: string,
    options: Record<string, unknown>,
  ): Promise<Client> {
    return await createClientAsync(serviceLocation, options);
  }

  public getCustomSoapOptions(): Record<string, unknown> {
    return this.customSoapOptions;
  }
}
